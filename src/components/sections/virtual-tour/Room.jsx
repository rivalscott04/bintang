import { ROOM_HEIGHT } from '../../../data/virtualTourRooms';
import Furniture from './Furniture';

/**
 * Render satu ruangan: lantai, 4 dinding (dengan bukaan pintu), plafon, dan furniture.
 *
 * Bukaan pintu dibuat dengan cara split dinding jadi 2-3 segmen, bukan boolean subtract
 * (boolean op di Three.js mahal & kompleks). Pintu = gap di tengah dinding.
 */
export default function Room({ room, doorOpenings = [] }) {
  const { bounds, floorColor, wallColor, accentColor, furniture } = room;
  const [x0, x1] = bounds.x;
  const [z0, z1] = bounds.z;
  const width = x1 - x0;
  const depth = z1 - z0;
  const centerX = (x0 + x1) / 2;
  const centerZ = (z0 + z1) / 2;
  const h = ROOM_HEIGHT;
  const wallThickness = 0.1;
  const doorWidth = 1.6;
  const doorHeight = 2.4;

  /**
   * Buat dinding dengan kemungkinan bukaan pintu.
   * @param {string} side - 'north' | 'south' | 'east' | 'west'
   */
  const renderWall = (side) => {
    const opening = doorOpenings.find((o) => o.side === side);
    const isHorizontal = side === 'north' || side === 'south';
    const wallLength = isHorizontal ? width : depth;
    const wallZ = side === 'north' ? z1 : side === 'south' ? z0 : centerZ;
    const wallX = side === 'east' ? x1 : side === 'west' ? x0 : centerX;
    const wallSize = isHorizontal ? [wallLength, h, wallThickness] : [wallThickness, h, wallLength];
    const wallPos = [wallX, h / 2, wallZ];

    if (!opening) {
      return (
        <mesh position={wallPos} receiveShadow castShadow>
          <boxGeometry args={wallSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>
      );
    }

    // Split dinding jadi 3 bagian: kiri pintu, atas pintu, kanan pintu
    const openingCenter = opening.center; // posisi tengah pintu sepanjang sumbu dinding
    const wallStart = isHorizontal ? x0 : z0;
    const wallEnd = isHorizontal ? x1 : z1;
    const leftLen = openingCenter - doorWidth / 2 - wallStart;
    const rightLen = wallEnd - (openingCenter + doorWidth / 2);
    const leftCenter = wallStart + leftLen / 2;
    const rightCenter = wallEnd - rightLen / 2;
    const topHeight = h - doorHeight;
    const topY = doorHeight + topHeight / 2;

    const segments = [];

    // Segmen kiri
    if (leftLen > 0.05) {
      const segPos = isHorizontal
        ? [leftCenter, h / 2, wallZ]
        : [wallX, h / 2, leftCenter];
      const segSize = isHorizontal
        ? [leftLen, h, wallThickness]
        : [wallThickness, h, leftLen];
      segments.push(
        <mesh key="left" position={segPos} receiveShadow castShadow>
          <boxGeometry args={segSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>,
      );
    }

    // Segmen kanan
    if (rightLen > 0.05) {
      const segPos = isHorizontal
        ? [rightCenter, h / 2, wallZ]
        : [wallX, h / 2, rightCenter];
      const segSize = isHorizontal
        ? [rightLen, h, wallThickness]
        : [wallThickness, h, rightLen];
      segments.push(
        <mesh key="right" position={segPos} receiveShadow castShadow>
          <boxGeometry args={segSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>,
      );
    }

    // Segmen atas pintu
    if (topHeight > 0.05) {
      const segPos = isHorizontal
        ? [openingCenter, topY, wallZ]
        : [wallX, topY, openingCenter];
      const segSize = isHorizontal
        ? [doorWidth, topHeight, wallThickness]
        : [wallThickness, topHeight, doorWidth];
      segments.push(
        <mesh key="top" position={segPos} receiveShadow castShadow>
          <boxGeometry args={segSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>,
      );
    }

    // Frame pintu (highlight tipis berwarna accent)
    const framePos = isHorizontal
      ? [openingCenter, doorHeight / 2, wallZ]
      : [wallX, doorHeight / 2, openingCenter];
    const frameSizeTop = isHorizontal
      ? [doorWidth + 0.1, 0.06, wallThickness + 0.02]
      : [wallThickness + 0.02, 0.06, doorWidth + 0.1];
    const frameTopPos = isHorizontal
      ? [openingCenter, doorHeight, wallZ]
      : [wallX, doorHeight, openingCenter];

    segments.push(
      <mesh key="frame-top" position={frameTopPos}>
        <boxGeometry args={frameSizeTop} />
        <meshStandardMaterial color={accentColor} roughness={0.5} />
      </mesh>,
    );

    return <>{segments}</>;
  };

  return (
    <group>
      {/* Lantai */}
      <mesh position={[centerX, 0, centerZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Plinth (skirting tipis di pertemuan lantai-dinding) untuk depth visual */}
      <mesh position={[centerX, 0.05, z0 + 0.02]}>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
      <mesh position={[centerX, 0.05, z1 - 0.02]}>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>

      {/* Plafon (langit-langit putih) */}
      <mesh position={[centerX, h, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>

      {/* 4 dinding */}
      {renderWall('north')}
      {renderWall('south')}
      {renderWall('east')}
      {renderWall('west')}

      {/* Furniture */}
      {furniture.map((item, i) => (
        <Furniture key={i} item={item} />
      ))}
    </group>
  );
}
