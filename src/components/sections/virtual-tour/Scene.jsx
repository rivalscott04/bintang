import { useRef } from 'react';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Room from './Room';
import Hotspot from './Hotspot';
import CameraController from './CameraController';
import { ROOMS, HOTSPOTS, CINEMATIC_WAYPOINTS } from '../../../data/virtualTourRooms';

/**
 * Scene 3D — gabungin semua ruangan + lighting + camera controls.
 *
 * Door openings antar ruangan (referensi ke floorplan):
 * - Living Room (south-west): pintu utara ke Bedroom (di x=-5), pintu timur ke Kitchen (di z=-4)
 * - Kitchen (south-east):     pintu barat ke Living (di z=-4), pintu utara ke Bathroom (di x=5)
 * - Bedroom (north-west):     pintu selatan ke Living (di x=-5), pintu timur ke Bathroom (di z=4)
 * - Bathroom (north-east):    pintu selatan ke Kitchen (di x=5), pintu barat ke Bedroom (di z=4)
 */

const ROOM_OPENINGS = {
  'living-room': [
    { side: 'north', center: -5 }, // ke Bedroom (sumbu X)
    { side: 'east', center: -4 }, // ke Kitchen (sumbu Z)
  ],
  kitchen: [
    { side: 'west', center: -4 }, // ke Living Room
    { side: 'north', center: 5 }, // ke Bathroom
  ],
  bedroom: [
    { side: 'south', center: -5 }, // ke Living Room
    { side: 'east', center: 4 }, // ke Bathroom
  ],
  bathroom: [
    { side: 'south', center: 5 }, // ke Kitchen
    { side: 'west', center: 4 }, // ke Bedroom
  ],
};

export default function Scene({ mode, activeRoomId, onRoomChange, isMobile = false }) {
  const orbitRef = useRef();

  const activeRoom = ROOMS.find((r) => r.id === activeRoomId);
  const targetView = activeRoom?.cameraView;

  return (
    <>
      {/* === LIGHTING ===
          Mobile: simplify drastis — naikkan ambient + 1 directional (no shadow) +
          1 point light. Skip hemisphere, skip Environment HDRI, skip contact shadows.
          Tujuan: jaga ≥30fps di mid-range Android. */}
      <ambientLight intensity={isMobile ? 0.85 : 0.5} color="#fff4e6" />

      <directionalLight
        position={[15, 20, 10]}
        intensity={isMobile ? 0.9 : 1.2}
        color="#fff4d6"
        castShadow={!isMobile}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
      />

      {!isMobile && (
        <>
          <hemisphereLight skyColor="#fdf0e0" groundColor="#3a2818" intensity={0.4} />
          <pointLight position={[-5, 3, -4]} intensity={0.8} color="#ffd28a" distance={12} decay={2} />
          <pointLight position={[5, 3, -4]} intensity={0.8} color="#ffd28a" distance={12} decay={2} />
          <pointLight position={[-5, 3, 4]} intensity={0.8} color="#ffd28a" distance={12} decay={2} />
          <pointLight position={[5, 3, 4]} intensity={0.8} color="#ffd28a" distance={12} decay={2} />
          <Environment preset="apartment" background={false} />
        </>
      )}

      {isMobile && (
        // 1 point light global (di tengah keempat ruangan) — cheap warm tint
        <pointLight position={[0, 4, 0]} intensity={0.5} color="#ffd28a" distance={20} decay={1.5} />
      )}

      {/* === ROOMS === */}
      {ROOMS.map((room) => (
        <Room key={room.id} room={room} doorOpenings={ROOM_OPENINGS[room.id] || []} />
      ))}

      {/* === HOTSPOTS (hanya dari ruangan aktif) === */}
      {mode === 'manual' &&
        HOTSPOTS.filter((h) => h.from === activeRoomId).map((h, i) => (
          <Hotspot key={i} hotspot={h} isActive isMobile={isMobile} onNavigate={onRoomChange} />
        ))}

      {/* Contact shadows hanya di desktop (heavy) */}
      {!isMobile && (
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={30}
          blur={2.5}
          far={4}
          resolution={512}
        />
      )}

      {/* === CAMERA CONTROLS ===
          - Target = pusat ruangan (di-set per ruangan via cameraView).
          - maxDistance=3 menjaga kamera tetap di dalam ruangan 10x8 bahkan saat user drag 360°.
            (Tanpa batas ini, kamera bisa orbit keluar tembok dan user lihat ruangan kosong.)
          - Polar angle dibatasi 72°-108° biar kamera tetap di sekitar eye level (gak nempel plafon/lantai).
      */}
      <OrbitControls
        ref={orbitRef}
        enablePan={false}
        enableZoom
        minDistance={1.2}
        maxDistance={3}
        minPolarAngle={Math.PI * 0.4}
        maxPolarAngle={Math.PI * 0.6}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
        enableDamping
        dampingFactor={0.1}
        makeDefault
      />

      <CameraController
        mode={mode}
        targetView={targetView}
        cinematicWaypoints={CINEMATIC_WAYPOINTS}
        orbitControlsRef={orbitRef}
        onWaypointChange={onRoomChange}
      />
    </>
  );
}
