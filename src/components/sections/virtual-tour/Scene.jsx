import { useRef } from 'react';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import Room from './Room';
import Hotspot from './Hotspot';
import CameraController from './CameraController';

/**
 * Scene 3D: gabungin semua ruangan + lighting + camera controls.
 * Data ruangan/hotspot/waypoint dari API (prop tourConfig).
 */
export default function Scene({ mode, activeRoomId, onRoomChange, isMobile = false, tourConfig }) {
  const orbitRef = useRef();

  const { rooms, hotspots, cinematicWaypoints, roomOpenings, roomHeight } = tourConfig;
  const activeRoom = rooms.find((r) => r.id === activeRoomId);
  const targetView = activeRoom?.cameraView;

  return (
    <>
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
        <pointLight position={[0, 4, 0]} intensity={0.5} color="#ffd28a" distance={20} decay={1.5} />
      )}

      {rooms.map((room) => (
        <Room
          key={room.id}
          room={room}
          doorOpenings={roomOpenings[room.id] || []}
          roomHeight={roomHeight}
        />
      ))}

      {mode === 'manual' &&
        hotspots
          .filter((h) => h.from === activeRoomId)
          .map((h, i) => (
            <Hotspot key={i} hotspot={h} isActive isMobile={isMobile} onNavigate={onRoomChange} />
          ))}

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
        cinematicWaypoints={cinematicWaypoints}
        orbitControlsRef={orbitRef}
        onWaypointChange={onRoomChange}
      />
    </>
  );
}
