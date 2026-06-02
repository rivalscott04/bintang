import { useState } from 'react';
import VirtualTourModal from '../virtual-tour/VirtualTourModal';
import { useVirtualTour } from '../../hooks/useVirtualTour';
import { assetUrl } from '../../utils/assets';
import { COPY } from '../../utils/messages';
import SectionHeader from '../ui/SectionHeader';

export default function VirtualTour() {
  const [tourActive, setTourActive] = useState(false);
  const { meta, scene, syncing, error } = useVirtualTour();

  const { section, preview, card } = meta;
  const previewSrc = preview?.image ?? assetUrl('/assets/cluster_marocco-828.webp');
  const previewAlt = preview?.imageAlt ?? 'Preview virtual tour 3D';

  return (
    <section id="virtual-tour" className="py-24 bg-surface">
      <div className="container-x">
        <SectionHeader label={section.label} title={section.title} description={section.description} />

        {error && (
          <p className="text-mute text-sm mb-6 text-center" role="status">
            {COPY.apiFallbackVirtualTour}
          </p>
        )}

        <div className="relative w-full h-[520px] max-md:h-auto max-md:min-h-[460px] rounded-lg overflow-hidden shadow-medium border border-white/70 bg-primary group">
          <img
            src={previewSrc}
            alt={previewAlt}
            width={828}
            height={828}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35] scale-105 transition-transform duration-3000 ease-luxury group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-br from-night/70 via-night/40 to-primary/80" />

          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle, #c5a880 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 h-full flex items-center justify-center p-6 max-md:py-10">
            <div className="text-center max-w-[560px]">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-secondary/40 flex items-center justify-center text-[2.2rem] text-secondary mx-auto mb-6 animate-pulse-glow backdrop-blur-sm">
                <i className="fa-solid fa-cube" />
              </div>

              {card.headline && (
                <p className="text-white text-[1.8rem] max-md:text-[1.4rem] mb-7 font-bold leading-tight font-display">
                  {card.headline}
                  {card.headlineAccent && (
                    <>
                      <br />
                      <span className="text-secondary">{card.headlineAccent}</span>
                    </>
                  )}
                </p>
              )}

              <button
                type="button"
                onClick={() => setTourActive(true)}
                disabled={syncing || !scene.rooms.length}
                aria-label={card.buttonLabel}
                className="btn-primary btn-large group/btn min-h-[48px] disabled:opacity-60"
              >
                <i className="fa-solid fa-play transition-transform duration-300 group-hover/btn:scale-110" />
                {syncing ? 'Memuat...' : card.buttonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <VirtualTourModal
        open={tourActive}
        onClose={() => setTourActive(false)}
        tourConfig={scene}
        meta={meta}
      />
    </section>
  );
}
