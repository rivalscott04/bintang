import { ABOUT_PARAGRAPHS, ABOUT_STATS } from '../../data/about';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { assetUrl } from '../../utils/assets';
import SectionHeader from '../ui/SectionHeader';

export default function About() {
  const handleScroll = useSmoothScroll();

  return (
    <section id="about" className="py-24 bg-surface">
      <div className="container-x">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[72px] max-md:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <SectionHeader
              label="TENTANG KAMI"
              title="Developer Terpercaya di Koridor Bekasi Barat"
              align="left"
            />

            {ABOUT_PARAGRAPHS.map((html) => (
              <p
                key={html}
                className="text-mute text-[1.05rem] font-light leading-[1.8]"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}

            <div className="grid grid-cols-2 gap-5 mt-3">
              {ABOUT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-primary/4 rounded-md p-6 text-center shadow-soft transition-all duration-400 ease-luxury hover:-translate-y-1 hover:shadow-medium hover:border-secondary/30"
                >
                  <div className="font-display font-extrabold text-[2.2rem] text-secondary-dark leading-none mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-[0.8rem] text-mute font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary self-start" onClick={handleScroll}>
              Hubungi Tim Kami <i className="fa-solid fa-chevron-right" />
            </a>
          </div>

          <div className="relative max-md:-order-1">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={assetUrl('/assets/stellar_avenue-640.webp')}
                type="image/webp"
              />
              <source
                media="(max-width: 1024px)"
                srcSet={assetUrl('/assets/stellar_avenue-828.webp')}
                type="image/webp"
              />
              <img
                src={assetUrl('/assets/stellar_avenue-1024.webp')}
                alt="Grand Kota Bintang Aerial View of Stellar Avenue Commercial Zone"
                width={1024}
                height={683}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-[480px] max-md:h-[300px] object-cover rounded-lg shadow-medium"
              />
            </picture>
            <div className="absolute -bottom-6 max-md:-bottom-4 -left-6 max-md:left-4 bg-primary text-secondary-light px-6 py-5 rounded-md shadow-[0_12px_30px_rgba(10,25,49,0.2)] max-w-[200px] border border-secondary/20">
              <i className="fa-solid fa-award text-[2rem] text-secondary block mb-2" />
              <strong className="font-display text-white text-[0.9rem] block mb-1">
                Best Developer
              </strong>
              <span className="text-[0.75rem] text-white/60">
                PropertyGuru Awards 2024 – Bekasi Region
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
