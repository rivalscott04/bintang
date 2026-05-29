import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * Hotspot interaktif di pintu antar ruangan.
 * - Cincin yang berdenyut + label saat hover.
 * - Klik = trigger navigate ke ruangan target.
 *
 * Auto-hide kalau bukan dari ruangan yang sedang aktif (biar gak crowded).
 */
export default function Hotspot({ hotspot, isActive, isMobile = false, onNavigate }) {
  const ringRef = useRef();
  const dotRef = useRef();
  const [hovered, setHovered] = useState(false);
  // Hit-area di mobile 2x lebih besar biar gampang di-tap dengan jempol.
  const hitRadius = isMobile ? 0.7 : 0.4;
  const dotRadius = isMobile ? 0.22 : 0.18;
  const ringSize = isMobile ? [0.4, 0.5] : [0.32, 0.4];

  // Animasi pulsasi
  useFrame(({ clock }) => {
    if (!isActive) return;
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.5) * 0.15;
    if (ringRef.current) {
      ringRef.current.scale.set(pulse, pulse, pulse);
      ringRef.current.material.opacity = 0.65 - Math.sin(t * 2.5) * 0.2;
    }
    if (dotRef.current) {
      dotRef.current.scale.setScalar(hovered ? 1.4 : 1 + Math.sin(t * 3) * 0.08);
    }
  });

  if (!isActive) return null;

  return (
    <group
      position={hotspot.position}
      onClick={(e) => {
        e.stopPropagation();
        onNavigate(hotspot.to);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Hit-area transparent (lebih besar dari visual, biar mudah di-klik/tap) */}
      <mesh visible={false}>
        <sphereGeometry args={[hitRadius, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Cincin pulsasi (face camera) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ringSize[0], ringSize[1], 32]} />
        <meshBasicMaterial color="#c5a880" transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {/* Dot tengah */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[dotRadius, 24, 24]} />
        <meshStandardMaterial
          color="#c5a880"
          emissive="#e5ba73"
          emissiveIntensity={hovered ? 1.2 : 0.7}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Label pas hover */}
      {hovered && (
        <Html distanceFactor={8} position={[0, 0.55, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="px-3 py-1.5 rounded-md bg-primary text-white text-xs font-display font-bold whitespace-nowrap shadow-glow border border-secondary/40">
            <i className="fa-solid fa-arrow-right mr-1.5 text-secondary" />
            {hotspot.label}
          </div>
        </Html>
      )}
    </group>
  );
}
