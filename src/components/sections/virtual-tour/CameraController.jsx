import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Easing function — cubic in-out (smooth start & end).
 */
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * CameraController — handle 2 mode kamera:
 *
 * 1. **manual** (free explore): kamera diam di posisi `targetView`,
 *    OrbitControls (di parent) handle rotate/zoom dari user.
 *    Saat targetView berubah (user klik ruangan / hotspot),
 *    kamera glide smooth ke posisi baru selama `transitionDuration` detik.
 *
 * 2. **cinematic** (auto-tour): kamera otomatis terbang antar waypoint
 *    dengan durasi & hold time per waypoint. Loop infinit.
 *
 * Pakai useFrame buat interpolasi smooth tiap frame (60fps).
 */
export default function CameraController({
  mode,
  targetView,
  cinematicWaypoints,
  onWaypointChange,
  orbitControlsRef,
  transitionDuration = 1.2,
}) {
  const { camera } = useThree();

  // State internal (pakai ref biar gak trigger re-render)
  const transitionRef = useRef({
    active: false,
    startTime: 0,
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
    toTarget: new THREE.Vector3(),
    duration: transitionDuration,
  });

  const cinematicRef = useRef({
    index: 0,
    phase: 'transition', // 'transition' | 'hold'
    phaseStartTime: 0,
    fromPos: new THREE.Vector3(),
    fromTarget: new THREE.Vector3(),
  });

  const currentTargetRef = useRef(new THREE.Vector3());

  /**
   * Trigger transisi manual saat targetView berubah (mode 'manual').
   */
  useEffect(() => {
    if (mode !== 'manual' || !targetView) return;
    const t = transitionRef.current;
    t.active = true;
    t.startTime = performance.now() / 1000;
    t.fromPos.copy(camera.position);
    t.toPos.set(...targetView.position);
    // Target awal: ambil dari orbit controls kalau ada, kalau gak pakai forward dari camera
    if (orbitControlsRef?.current) {
      t.fromTarget.copy(orbitControlsRef.current.target);
    } else {
      t.fromTarget.copy(currentTargetRef.current);
    }
    t.toTarget.set(...targetView.target);
    t.duration = transitionDuration;
    // Disable orbit controls saat transisi biar gak konflik
    if (orbitControlsRef?.current) {
      orbitControlsRef.current.enabled = false;
    }
  }, [targetView, mode, camera, orbitControlsRef, transitionDuration]);

  /**
   * Reset cinematic saat mode berubah ke cinematic.
   */
  useEffect(() => {
    if (mode === 'cinematic' && cinematicWaypoints?.length) {
      const c = cinematicRef.current;
      c.index = 0;
      c.phase = 'transition';
      c.phaseStartTime = performance.now() / 1000;
      c.fromPos.copy(camera.position);
      c.fromTarget.copy(currentTargetRef.current);
      // Disable orbit controls
      if (orbitControlsRef?.current) {
        orbitControlsRef.current.enabled = false;
      }
    } else if (mode === 'manual') {
      // Sync orbit controls target dengan posisi terakhir kamera/target
      // (penting kalau user stop cinematic mid-tour — biar drag langsung natural,
      //  gak orbit di world origin (0,0,0)).
      if (orbitControlsRef?.current) {
        orbitControlsRef.current.target.copy(currentTargetRef.current);
        orbitControlsRef.current.update();
        if (!transitionRef.current.active) {
          orbitControlsRef.current.enabled = true;
        }
      }
    }
  }, [mode, cinematicWaypoints, camera, orbitControlsRef]);

  useFrame(() => {
    const now = performance.now() / 1000;

    // ----- MODE MANUAL: handle transisi saat user klik ruangan -----
    if (mode === 'manual') {
      const t = transitionRef.current;
      if (t.active) {
        const elapsed = now - t.startTime;
        const progress = Math.min(elapsed / t.duration, 1);
        const eased = easeInOutCubic(progress);

        camera.position.lerpVectors(t.fromPos, t.toPos, eased);
        currentTargetRef.current.lerpVectors(t.fromTarget, t.toTarget, eased);
        camera.lookAt(currentTargetRef.current);

        if (orbitControlsRef?.current) {
          orbitControlsRef.current.target.copy(currentTargetRef.current);
        }

        if (progress >= 1) {
          t.active = false;
          if (orbitControlsRef?.current) {
            orbitControlsRef.current.enabled = true;
            orbitControlsRef.current.update();
          }
        }
      } else if (orbitControlsRef?.current) {
        // Sync current target dengan orbit controls target (user lagi drag)
        currentTargetRef.current.copy(orbitControlsRef.current.target);
      }
      return;
    }

    // ----- MODE CINEMATIC: auto-tour antar waypoints -----
    if (mode === 'cinematic' && cinematicWaypoints?.length) {
      const c = cinematicRef.current;
      const wp = cinematicWaypoints[c.index];
      const elapsed = now - c.phaseStartTime;

      if (c.phase === 'transition') {
        const duration = Math.max(wp.duration, 0.001);
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);

        const toPos = new THREE.Vector3(...wp.position);
        const toTarget = new THREE.Vector3(...wp.target);

        camera.position.lerpVectors(c.fromPos, toPos, eased);
        currentTargetRef.current.lerpVectors(c.fromTarget, toTarget, eased);
        camera.lookAt(currentTargetRef.current);

        if (progress >= 1) {
          c.phase = 'hold';
          c.phaseStartTime = now;
          // Notif parent ttg waypoint aktif (buat highlight room di sidebar)
          if (onWaypointChange && wp.roomId) {
            onWaypointChange(wp.roomId);
          }
        }
      } else if (c.phase === 'hold') {
        // Sedikit gerakan halus saat hold (mimic handheld camera)
        const t = elapsed * 0.5;
        const wobbleX = Math.sin(t) * 0.05;
        const wobbleY = Math.cos(t * 0.8) * 0.03;
        const basePos = new THREE.Vector3(...wp.position);
        camera.position.copy(basePos).add(new THREE.Vector3(wobbleX, wobbleY, 0));
        const baseTarget = new THREE.Vector3(...wp.target);
        currentTargetRef.current.copy(baseTarget);
        camera.lookAt(currentTargetRef.current);

        if (elapsed >= wp.hold) {
          // Pindah ke waypoint berikutnya (loop)
          const nextIndex = (c.index + 1) % cinematicWaypoints.length;
          c.index = nextIndex;
          c.phase = 'transition';
          c.phaseStartTime = now;
          c.fromPos.copy(camera.position);
          c.fromTarget.copy(currentTargetRef.current);
        }
      }
    }
  });

  return null;
}
