import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Scene from './Scene';
import { useIsMobile } from '../../../hooks/useIsMobile';

/**
 * VirtualTour3D: fullscreen modal yang berisi 3D scene + UI overlay.
 *
 * Layout adaptif:
 *  - Desktop (≥768px): sidebar ruangan di kiri, top bar dengan title + mode toggle, help di kanan.
 *  - Mobile (<768px):  top bar compact (icon-only), bottom sheet dengan room pill nav + info panel,
 *                      mobile help bubble dengan instruksi touch.
 *
 * Performance:
 *  - Mobile: dpr cap=1.25, shadows OFF, point lights & HDRI di-skip via prop isMobile ke Scene.
 *  - Desktop: dpr cap=1.8, shadows ON, full lighting setup.
 */
export default function VirtualTour3D({ onClose, tourConfig, meta }) {
  const isMobile = useIsMobile();
  const rooms = tourConfig?.rooms ?? [];
  const initialRoomId = rooms[0]?.id ?? 'living-room';
  const [mode, setMode] = useState('manual');
  const [activeRoomId, setActiveRoomId] = useState(initialRoomId);
  const [showHelp, setShowHelp] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const activeRoom = rooms.find((r) => r.id === activeRoomId);
  const modalSubtitle = meta?.modal?.subtitle ?? 'Virtual Tour 3D';

  useEffect(() => {
    for (const room of rooms) {
      if (room.modelUrl) {
        useGLTF.preload(room.modelUrl);
      }
    }
  }, [rooms]);

  // Lock body scroll selama modal aktif
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // ESC buat close (desktop)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Help auto-hide setelah 7 detik
  useEffect(() => {
    const t = setTimeout(() => setShowHelp(false), 7000);
    return () => clearTimeout(t);
  }, []);

  const handleRoomChange = (roomId) => {
    setActiveRoomId(roomId);
    setShowHelp(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setShowHelp(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vt-dialog-title"
      className="fixed inset-x-0 top-0 z-200 bg-night animate-vt-fade-in"
      style={{
        // 100dvh = dynamic viewport height (adapt ke visible area saat address bar mobile
        // show/hide). Tanpa ini, modal pakai 100vh = layout viewport = lebih tinggi dari
        // visible area di mobile → bottom sheet terpotong di bawah address bar.
        height: '100dvh',
        touchAction: 'none',
      }}
    >
      <h2 id="vt-dialog-title" className="sr-only">
        Tur virtual 3D: {modalSubtitle}
      </h2>

      {/* === CANVAS 3D === */}
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.25] : [1, 1.8]}
        camera={{ position: [-3.5, 1.7, -2.5], fov: isMobile ? 70 : 60, near: 0.1, far: 100 }}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
        onCreated={() => setIsReady(true)}
        style={{
          background: 'linear-gradient(180deg, #070f1e 0%, #15305b 100%)',
          touchAction: 'none',
        }}
      >
        <Suspense fallback={null}>
          <Scene
            mode={mode}
            activeRoomId={activeRoomId}
            onRoomChange={handleRoomChange}
            isMobile={isMobile}
            tourConfig={tourConfig}
          />
        </Suspense>
      </Canvas>

      {/* === LOADING OVERLAY === */}
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-night">
          <div className="text-center text-white px-6">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-white/10 border border-secondary/30 flex items-center justify-center text-3xl text-secondary animate-pulse-glow">
              <i className="fa-solid fa-cube fa-spin" />
            </div>
            <p className="text-white font-display text-xl mb-2 font-bold">Memuat Ruang 3D...</p>
            <p className="text-white/60 text-sm font-light">Menyiapkan tekstur & lighting interior premium.</p>
          </div>
        </div>
      )}

      {/* ====================================================================
          TOP BAR
          - Desktop: title pill + mode toggle (center) + close
          - Mobile : icon button + mode toggle pill (compact) + close
          ==================================================================== */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-2 pointer-events-none px-3 md:px-5"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        {/* Title: desktop only */}
        <div className="hidden md:flex items-center gap-3 pointer-events-auto bg-night/60 backdrop-blur-md border border-white/10 rounded-md px-4 py-2.5">
          <i className="fa-solid fa-vr-cardboard text-secondary text-lg" />
          <div className="leading-tight">
            <div className="text-[0.65rem] uppercase tracking-[2px] text-secondary font-display font-bold">
              Virtual Tour 3D
            </div>
            <div className="text-white font-display font-bold text-sm">{modalSubtitle}</div>
          </div>
        </div>

        {/* Title: mobile: just icon button (saves space) */}
        <div className="md:hidden pointer-events-auto bg-night/60 backdrop-blur-md border border-white/10 rounded-md w-11 h-11 flex items-center justify-center text-secondary">
          <i className="fa-solid fa-vr-cardboard text-lg" />
        </div>

        {/* Mode toggle: works on both, compact on mobile */}
        <div className="pointer-events-auto bg-night/60 backdrop-blur-md border border-white/10 rounded-md p-1 flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('manual')}
            aria-label="Mode Jelajah Bebas"
            className={`px-3 md:px-4 py-2 min-h-[44px] rounded-sm font-display text-[0.7rem] md:text-xs font-bold transition-all duration-300 ease-luxury flex items-center gap-1.5 md:gap-2 ${
              mode === 'manual'
                ? 'bg-secondary text-primary shadow-glow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-hand-pointer" />
            <span className="max-md:hidden">Jelajah Bebas</span>
            <span className="md:hidden">Jelajah</span>
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('cinematic')}
            aria-label="Mode Preview Otomatis"
            className={`px-3 md:px-4 py-2 min-h-[44px] rounded-sm font-display text-[0.7rem] md:text-xs font-bold transition-all duration-300 ease-luxury flex items-center gap-1.5 md:gap-2 ${
              mode === 'cinematic'
                ? 'bg-secondary text-primary shadow-glow'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <i className="fa-solid fa-clapperboard" />
            <span className="max-md:hidden">Preview Otomatis</span>
            <span className="md:hidden">Preview</span>
          </button>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Virtual Tour"
          className="pointer-events-auto w-11 h-11 min-w-[44px] min-h-[44px] rounded-md bg-night/60 backdrop-blur-md border border-white/10 text-white hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 ease-luxury flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </div>

      {/* ====================================================================
          DESKTOP: SIDEBAR KIRI (room selector vertical)
          ==================================================================== */}
      <div
        className={`hidden md:block absolute left-5 top-1/2 -translate-y-1/2 z-20 transition-all duration-500 ease-luxury ${
          mode === 'manual'
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-8 pointer-events-none'
        }`}
      >
        <div className="bg-night/60 backdrop-blur-md border border-white/10 rounded-md p-2 flex flex-col gap-1">
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => handleRoomChange(room.id)}
              aria-label={`Pindah ke ${room.name}`}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-sm font-display text-xs font-bold transition-all duration-300 ease-luxury text-left ${
                activeRoomId === room.id
                  ? 'bg-secondary text-primary shadow-glow'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <i className={`fa-solid ${room.icon} text-base w-5 text-center`} />
              <span className="whitespace-nowrap pr-2">{room.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ====================================================================
          DESKTOP: BOTTOM CENTER: Room Info Panel (manual mode only)
          ==================================================================== */}
      {mode === 'manual' && activeRoom && (
        <div className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 z-20 max-w-[520px] w-[calc(100%-2.5rem)] pointer-events-auto bg-night/70 backdrop-blur-md border border-white/10 rounded-md p-4 animate-vt-slide-up">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary text-xl shrink-0">
              <i className={`fa-solid ${activeRoom.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <p className="text-white font-display font-bold text-base leading-tight">
                  {activeRoom.name}
                </p>
                <span className="text-secondary font-display font-bold text-xs whitespace-nowrap">
                  {activeRoom.specs.area}
                </span>
              </div>
              <p className="text-white/70 text-xs font-light leading-relaxed line-clamp-2">
                {activeRoom.description}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[0.65rem] text-secondary-light/80 font-display font-bold uppercase tracking-wider">
                <i className="fa-solid fa-star text-[0.6rem]" />
                {activeRoom.specs.highlight}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MOBILE: BOTTOM SHEET (info ruangan + horizontal room nav)
          ==================================================================== */}
      {mode === 'manual' && activeRoom && (
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 z-20 pointer-events-auto bg-night/85 backdrop-blur-lg border-t border-white/10 rounded-t-lg animate-vt-slide-up"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          {/* Drag handle indicator (visual cue this is a sheet) */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Info ruangan aktif: 1 baris compact */}
          <div className="px-4 pt-1 pb-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary text-base shrink-0">
              <i className={`fa-solid ${activeRoom.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-0.5">
                <p className="text-white font-display font-bold text-sm leading-tight truncate">
                  {activeRoom.name}
                </p>
                <span className="text-secondary font-display font-bold text-[0.7rem] whitespace-nowrap">
                  · {activeRoom.specs.area}
                </span>
              </div>
              <p className="text-white/60 text-[0.7rem] font-light leading-snug line-clamp-1">
                {activeRoom.specs.highlight}
              </p>
            </div>
          </div>

          {/* Horizontal room pill nav: scrollable kalau kebanyakan */}
          <div className="border-t border-white/5 px-3 py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-luxury -mx-1 px-1">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => handleRoomChange(room.id)}
                  aria-label={`Pindah ke ${room.name}`}
                  className={`flex-1 min-w-[78px] min-h-[44px] flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-md font-display text-[0.65rem] font-bold transition-all duration-300 ease-luxury ${
                    activeRoomId === room.id
                      ? 'bg-secondary text-primary shadow-glow'
                      : 'bg-white/5 text-white/70 active:bg-white/10'
                  }`}
                >
                  <i className={`fa-solid ${room.icon} text-base`} />
                  <span className="whitespace-nowrap leading-tight text-center">
                    {room.name.replace('Kamar Tidur Utama', 'Kamar')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CINEMATIC NOW PLAYING: bottom center, both desktop + mobile
          ==================================================================== */}
      {mode === 'cinematic' && activeRoom && (
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto bg-night/85 backdrop-blur-md border border-white/10 rounded-md pl-4 pr-2 py-2 flex items-center gap-2.5 animate-vt-slide-up shadow-glow max-md:bottom-3 max-md:max-w-[calc(100%-1.5rem)]"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0)' }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
          <div className="text-white/60 font-display text-[0.65rem] uppercase tracking-[2px] max-md:hidden">
            Memutar
          </div>
          <i className={`fa-solid ${activeRoom.icon} text-secondary shrink-0`} />
          <div className="text-white font-display font-bold text-sm pr-1 truncate">{activeRoom.name}</div>
          <button
            type="button"
            onClick={() => handleModeChange('manual')}
            aria-label="Hentikan preview otomatis dan jelajah manual"
            className="ml-1 px-3 py-2 min-h-[44px] rounded-sm bg-secondary text-primary font-display font-bold text-[0.65rem] uppercase tracking-wider hover:bg-white active:bg-white hover:text-primary transition-colors duration-300 ease-luxury flex items-center gap-1.5 shrink-0"
          >
            <i className="fa-solid fa-stop" />
            Stop
          </button>
        </div>
      )}

      {/* ====================================================================
          HELP: DESKTOP (sidebar kanan)
          ==================================================================== */}
      {showHelp && isReady && !isMobile && (
        <div className="absolute top-1/2 right-5 -translate-y-1/2 z-20 max-w-[280px] pointer-events-auto bg-night/85 backdrop-blur-md border border-secondary/30 rounded-md p-4 animate-vt-slide-up shadow-glow">
          <div className="flex items-center gap-2 mb-3">
            <i className="fa-solid fa-circle-info text-secondary" />
            <span className="text-white font-display font-bold text-xs uppercase tracking-wider">Cara Pakai</span>
          </div>
          <ul className="space-y-2.5 text-white/85 text-xs font-light leading-relaxed">
            <li className="flex gap-2.5">
              <i className="fa-solid fa-arrows-up-down-left-right text-secondary mt-0.5 w-4 shrink-0" />
              <span>
                <strong className="text-white">Drag</strong> mouse untuk lihat sekeliling ruangan.
              </span>
            </li>
            <li className="flex gap-2.5">
              <i className="fa-solid fa-magnifying-glass-plus text-secondary mt-0.5 w-4 shrink-0" />
              <span>
                <strong className="text-white">Scroll</strong> untuk zoom in/out.
              </span>
            </li>
            <li className="flex gap-2.5">
              <i className="fa-solid fa-list text-secondary mt-0.5 w-4 shrink-0" />
              <span>
                Klik <strong className="text-white">menu ruangan</strong> di kiri untuk pindah.
              </span>
            </li>
            <li className="flex gap-2.5">
              <i className="fa-solid fa-circle-dot text-secondary mt-0.5 w-4 shrink-0" />
              <span>
                Atau klik titik <span className="text-secondary font-bold">emas</span> di pintu antar ruangan.
              </span>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => setShowHelp(false)}
            aria-label="Tutup panduan cara pakai"
            className="mt-3 w-full min-h-[44px] text-center text-[0.7rem] text-secondary hover:text-white font-display font-bold uppercase tracking-wider transition-colors"
          >
            Mengerti, Tutup
          </button>
        </div>
      )}

      {/* ====================================================================
          HELP: MOBILE (floating bubble di tengah-atas, instruksi touch)
          ==================================================================== */}
      {showHelp && isReady && isMobile && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-30 max-w-[calc(100%-1.5rem)] pointer-events-auto bg-night/90 backdrop-blur-md border border-secondary/30 rounded-md px-4 py-3 animate-vt-slide-up shadow-glow"
          style={{ top: 'calc(max(0.75rem, env(safe-area-inset-top)) + 3.75rem)' }}
        >
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-hand-pointer text-secondary text-lg mt-0.5 shrink-0" />
            <div className="flex-1 text-white text-[0.75rem] leading-relaxed font-light">
              <strong className="text-white font-bold">Swipe</strong> untuk lihat sekeliling ·{' '}
              <strong className="text-white font-bold">Pinch</strong> untuk zoom · Tap titik{' '}
              <span className="text-secondary font-bold">emas</span> di pintu untuk pindah ruangan.
            </div>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              aria-label="Tutup bantuan"
              className="text-white/60 hover:text-white shrink-0 -mt-1 -mr-1 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
