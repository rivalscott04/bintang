import { CLUSTERS } from '../../data/clusters';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import SectionHeader from '../ui/SectionHeader';

function ClusterCard({ cluster }) {
  const handleScroll = useSmoothScroll();

  return (
    <article className="group relative bg-surface rounded-md overflow-hidden shadow-soft border border-primary/3 transition-all duration-400 ease-luxury hover:-translate-y-2 hover:shadow-medium">
      <div className="absolute top-5 left-5 z-10 bg-primary text-secondary-light px-3.5 py-1.5 rounded-full font-display font-bold text-[0.75rem] tracking-wider shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
        {cluster.badge}
      </div>

      <div className="relative h-[320px] max-md:h-[240px] overflow-hidden">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={`${cluster.image.replace('.webp', '-640.webp')}`}
            type="image/webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet={`${cluster.image.replace('.webp', '-828.webp')}`}
            type="image/webp"
          />
          <img
            src={cluster.image}
            alt={cluster.imageAlt}
            width={1024}
            height={683}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-400 ease-luxury group-hover:scale-[1.08]"
          />
        </picture>
        <div className="absolute inset-0 bg-night/40 opacity-0 flex items-center justify-center transition-opacity duration-400 ease-luxury group-hover:opacity-100 z-5">
          <a href={cluster.hoverCta.href} className="btn-primary btn-small" onClick={handleScroll}>
            <i className={cluster.hoverCta.icon} /> {cluster.hoverCta.label}
          </a>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-[1.4rem] mb-2">{cluster.title}</h3>
        <p className="font-display font-bold text-secondary-dark text-[1.15rem] mb-4">
          {cluster.price}
        </p>
        <p className="text-mute text-[0.95rem] mb-6 font-light">{cluster.excerpt}</p>

        <div className="flex gap-5 max-md:gap-3 max-md:flex-wrap border-t border-b border-primary/8 py-4 mb-7">
          {cluster.specs.map((spec) => (
            <span key={spec.label} className="text-[0.85rem] text-mute flex items-center gap-2">
              <i className={`${spec.icon} text-secondary`} /> {spec.label}
            </span>
          ))}
        </div>

        <a href={cluster.cta.href} className="btn-outline btn-full" onClick={handleScroll}>
          {cluster.cta.label} <i className="fa-solid fa-chevron-right" />
        </a>
      </div>
    </article>
  );
}

export default function Clusters() {
  return (
    <section id="clusters" className="py-24 bg-white">
      <div className="container-x">
        <SectionHeader
          label="PILIHAN HUNIAN & BISNIS"
          title="Masterpiece Residential & Shophouses"
          description="Koleksi hunian eksklusif yang dirancang secara detail untuk memaksimalkan kenyamanan keluarga serta mendukung produktivitas bisnis Anda."
        />

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:gap-6">
          {CLUSTERS.map((cluster) => (
            <ClusterCard key={cluster.id} cluster={cluster} />
          ))}
        </div>
      </div>
    </section>
  );
}
