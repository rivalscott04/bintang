import { useMemo } from 'react';
import { Center, useGLTF } from '@react-three/drei';

/**
 * Ruangan dari file GLB: diposisikan di dalam bounds denah yang sama dengan mode primitif.
 */
function GlbMesh({ url, scale }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => {
    const copy = scene.clone();
    copy.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return copy;
  }, [scene]);

  return <primitive object={cloned} scale={scale} />;
}

export default function RoomModel({ room }) {
  const { bounds, modelUrl, modelScale = 1, modelPosition } = room;
  const [x0, x1] = bounds.x;
  const [z0, z1] = bounds.z;
  const centerX = (x0 + x1) / 2;
  const centerZ = (z0 + z1) / 2;
  const offset = modelPosition ?? [0, 0, 0];
  const position = [centerX + offset[0], offset[1], centerZ + offset[2]];

  return (
    <group position={position}>
      <Center disableY>
        <GlbMesh url={modelUrl} scale={modelScale} />
      </Center>
    </group>
  );
}
