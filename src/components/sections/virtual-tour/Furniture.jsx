/**
 * Renderer generik untuk satu item furniture.
 * Dipanggil per item dari array `furniture` di virtualTourRooms.js.
 *
 * Type yang didukung: box, sphere, cylinder, cone.
 * Untuk swap dengan model GLB asli nanti:
 *   import { useGLTF } from '@react-three/drei';
 *   const { scene } = useGLTF('/assets/3d/sofa.glb');
 *   return <primitive object={scene} position={position} />;
 */
export default function Furniture({ item }) {
  const {
    type,
    position,
    size,
    radius,
    height,
    color,
    emissive,
    emissiveIntensity = 0,
    transparent = false,
    opacity = 1,
  } = item;

  const materialProps = {
    color,
    roughness: 0.7,
    metalness: 0.1,
    transparent,
    opacity,
    ...(emissive && { emissive, emissiveIntensity }),
  };

  if (type === 'box') {
    return (
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  if (type === 'sphere') {
    return (
      <mesh position={position} castShadow>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  if (type === 'cylinder') {
    // size = [radiusTop, radiusBottom, height]
    return (
      <mesh position={position} castShadow receiveShadow>
        <cylinderGeometry args={[size[0], size[1], size[2], 24]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  if (type === 'cone') {
    return (
      <mesh position={position} castShadow>
        <coneGeometry args={[radius, height, 16]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    );
  }

  return null;
}
