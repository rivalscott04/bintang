import Furniture from './Furniture';
import RoomModel from './RoomModel';

/**
 * Render satu ruangan: model GLB (jika ada) atau primitif + furniture.
 */
export default function Room({ room, doorOpenings = [], roomHeight = 3.2 }) {
  if (room.modelUrl) {
    return <RoomModel room={room} />;
  }

  const { bounds, floorColor, wallColor, accentColor, furniture } = room;
  const [x0, x1] = bounds.x;
  const [z0, z1] = bounds.z;
  const width = x1 - x0;
  const depth = z1 - z0;
  const centerX = (x0 + x1) / 2;
  const centerZ = (z0 + z1) / 2;
  const h = roomHeight;
  const wallThickness = 0.1;
  const doorWidth = 1.6;
  const doorHeight = 2.4;

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

    const openingCenter = opening.center;
    const wallStart = isHorizontal ? x0 : z0;
    const wallEnd = isHorizontal ? x1 : z1;
    const leftLen = openingCenter - doorWidth / 2 - wallStart;
    const rightLen = wallEnd - (openingCenter + doorWidth / 2);
    const leftCenter = wallStart + leftLen / 2;
    const rightCenter = wallEnd - rightLen / 2;
    const topHeight = h - doorHeight;
    const topY = doorHeight + topHeight / 2;

    const segments = [];

    if (leftLen > 0.05) {
      const segPos = isHorizontal ? [leftCenter, h / 2, wallZ] : [wallX, h / 2, leftCenter];
      const segSize = isHorizontal ? [leftLen, h, wallThickness] : [wallThickness, h, leftLen];
      segments.push(
        <mesh key="left" position={segPos} receiveShadow castShadow>
          <boxGeometry args={segSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>,
      );
    }

    if (rightLen > 0.05) {
      const segPos = isHorizontal ? [rightCenter, h / 2, wallZ] : [wallX, h / 2, rightCenter];
      const segSize = isHorizontal ? [rightLen, h, wallThickness] : [wallThickness, h, rightLen];
      segments.push(
        <mesh key="right" position={segPos} receiveShadow castShadow>
          <boxGeometry args={segSize} />
          <meshStandardMaterial color={wallColor} roughness={0.9} />
        </mesh>,
      );
    }

    if (topHeight > 0.05) {
      const segPos = isHorizontal ? [openingCenter, topY, wallZ] : [wallX, topY, openingCenter];
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
      <mesh position={[centerX, 0, centerZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={floorColor} roughness={0.6} metalness={0.05} />
      </mesh>

      <mesh position={[centerX, 0.05, z0 + 0.02]}>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
      <mesh position={[centerX, 0.05, z1 - 0.02]}>
        <boxGeometry args={[width, 0.1, 0.04]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>

      <mesh position={[centerX, h, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>

      {renderWall('north')}
      {renderWall('south')}
      {renderWall('east')}
      {renderWall('west')}

      {furniture?.map((item, i) => (
        <Furniture key={i} item={item} />
      ))}
    </group>
  );
}
