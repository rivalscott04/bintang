import { useState, lazy, Suspense } from 'react';
import SectionHeader from '../ui/SectionHeader';

// Lazy load 3D bundle (~600KB three.js + drei) — hanya load saat user klik "Mulai Tur"
const VirtualTour3D = lazy(() => import('./virtual-tour/VirtualTour3D'));

export default function VirtualTour() {
  const [tourActive, setTourActive] = useState(false);

  return (
    <section id="virtual-tour" className="py-24 bg-surface">
      <div className="container-x">
        <SectionHeader
          label="PENGALAMAN INTERAKTIF"
          title="3D Virtual Space Explorer"
          description="Jelajahi unit perumahan mewah kami dalam 3D nyata. Kamera bergerak smooth antar ruangan — rasakan setiap sudut tanpa harus datang ke lokasi."
        />

        {/* Card preview — desktop fixed-height, mobile auto-grow biar gak ada konten yang terpotong */}
        <div className="relative w-full h-[520px] max-md:h-auto max-md:min-h-[460px] rounded-lg overflow-hidden shadow-medium border border-white/70 bg-primary group">
          <img
            src="/assets/cluster_marocco.webp"
            alt="Preview Cluster Marocco Virtual Tour 3D"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-3000 ease-luxury group-hover:scale-110"
          />

          {/* Gradient overlay biar text readable */}
          <div className="absolute inset-0 bg-linear-to-br from-night/70 via-night/40 to-primary/80" />

          {/* Animated grid dots (subtle texture) */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle, #c5a880 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content — vertical padding lebih besar di mobile karena card sekarang auto-grow */}
          <div className="relative z-10 h-full flex items-center justify-center p-6 max-md:py-10">
            <div className="text-center max-w-[560px]">
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-white/5 border border-secondary/40 flex items-center justify-center text-[2.2rem] text-secondary mx-auto mb-6 animate-pulse-glow backdrop-blur-sm">
                <i className="fa-solid fa-cube" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 border border-secondary/30 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary text-[0.65rem] font-display font-bold uppercase tracking-[2px]">
                  Real 3D · Bukan Foto 360°
                </span>
              </div>

              <h3 className="text-white text-[1.8rem] max-md:text-[1.4rem] mb-3 font-bold leading-tight">
                Masuki Cluster Marocco
                <br />
                <span className="text-secondary">Dalam Ruang Tiga Dimensi</span>
              </h3>

              <p className="text-white/75 text-[0.95rem] max-md:text-[0.85rem] mb-7 font-light leading-relaxed">
                Kamera otomatis menjelajah 4 ruangan dengan gerakan sinematik, atau ambil kendali sendiri untuk
                eksplorasi bebas. Berfungsi langsung di browser, tanpa install apapun.
              </p>

              <button
                type="button"
                onClick={() => setTourActive(true)}
                className="btn-primary btn-large group/btn"
              >
                <i className="fa-solid fa-play transition-transform duration-300 group-hover/btn:scale-110" />
                Mulai Tur Virtual 3D
              </button>

              {/* Feature badges */}
              <div className="mt-6 flex items-center justify-center gap-5 max-md:gap-3 flex-wrap text-white/60 text-xs font-display">
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-clapperboard text-secondary" />
                  Tur Sinematik
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-hand-pointer text-secondary" />
                  Jelajah Bebas
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-mobile-screen text-secondary" />
                  Mobile Friendly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen 3D Modal */}
      {tourActive && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-200 bg-night flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-white/10 border border-secondary/30 flex items-center justify-center text-3xl text-secondary animate-pulse-glow">
                  <i className="fa-solid fa-circle-notch fa-spin" />
                </div>
                <h3 className="text-white font-display text-xl mb-2">Memuat Engine 3D...</h3>
                <p className="text-white/60 text-sm font-light">Mengunduh library Three.js (sekali saja).</p>
              </div>
            </div>
          }
        >
          <VirtualTour3D onClose={() => setTourActive(false)} />
        </Suspense>
      )}
    </section>
  );
}
