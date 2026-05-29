import { useEffect } from 'react';
import { HERO_FEATURES } from '../../data/heroFeatures';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function Hero() {
  const handleScroll = useSmoothScroll();

  useEffect(() => {
    document.getElementById('hero-lcp-bg')?.remove();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[95vh] min-h-[650px] max-md:h-auto max-md:min-h-0 max-md:pb-16 flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-2 bg-linear-to-b from-night/40 to-night/80" />

      <div className="absolute inset-0 z-1">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/assets/cluster_marocco-640.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/assets/cluster_marocco-828.webp"
            type="image/webp"
          />
          <img
            src="/assets/cluster_marocco.webp"
            alt="Grand Kota Bintang Townhouse Exterior at Sunset"
            width={1024}
            height={1024}
            className="w-full h-full object-cover animate-slow-zoom"
            fetchPriority="high"
            decoding="sync"
            sizes="100vw"
          />
        </picture>
      </div>

      <div className="relative z-3 max-w-[800px] mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/40 backdrop-blur-md px-[18px] py-2 rounded-full font-display font-bold text-[0.8rem] tracking-[1.5px] text-secondary-light mb-6">
          <i className="fa-solid fa-gem" /> THE GOLDEN ACCESS SUPERBLOCK
        </div>

        <h1 className="text-[3.5rem] max-md:text-[2.2rem] font-extrabold text-white mb-5 tracking-[-1px]">
          Elevate Your Lifestyle In Bekasi&apos;s Premium Haven
        </h1>

        <p className="text-[1.2rem] max-md:text-base text-white/85 max-w-[680px] mx-auto mb-9 max-md:mb-6 font-light">
          Rasakan kenyamanan hidup premium dengan konsep modern superblock terintegrasi. Akses
          langsung 0 km ke Gerbang Tol JORR &amp; Becakayu untuk konektivitas tanpa batas.
        </p>

        <div className="flex justify-center gap-4 mb-16 max-md:flex-col max-md:gap-3 max-md:items-stretch">
          <a href="#clusters" className="btn-primary btn-large justify-center" onClick={handleScroll}>
            Lihat Proyek <i className="fa-solid fa-arrow-down" />
          </a>
          <a href="#virtual-tour" className="btn-secondary btn-large justify-center" onClick={handleScroll}>
            <i className="fa-solid fa-vr-cardboard" /> Jelajah 3D Virtual Tour
          </a>
        </div>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5 max-md:gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-md p-5">
          {HERO_FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4 text-left">
              <span className="text-2xl text-secondary bg-secondary/10 w-12 h-12 rounded-sm flex items-center justify-center border border-secondary/20 shrink-0">
                <i className={feature.icon} />
              </span>
              <div className="flex flex-col">
                <strong className="font-display font-bold text-[0.95rem] text-white">
                  {feature.title}
                </strong>
                <span className="text-[0.75rem] text-white/60">{feature.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
