import { Link } from 'react-router-dom';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function ClusterCard({ cluster }) {
  const handleScroll = useSmoothScroll();
  const slug = cluster.slug ?? cluster.id;
  const hoverHref = cluster.hoverCta?.href ?? `/klaster/${slug}`;
  const hoverIsRoute = hoverHref.startsWith('/') && !hoverHref.startsWith('/#');
  const ctaHref = cluster.cta?.href ?? '/#contact';
  const ctaIsRoute = ctaHref.startsWith('/') && !ctaHref.startsWith('/#');

  return (
    <article className="group relative bg-surface rounded-md overflow-hidden shadow-soft border border-primary/3 transition-all duration-400 ease-luxury hover:-translate-y-2 hover:shadow-medium">
      <Link
        to={`/klaster/${slug}`}
        className="absolute top-5 left-5 z-10 bg-primary text-secondary-light px-3.5 py-1.5 rounded-full font-display font-bold text-[0.75rem] tracking-wider shadow-[0_4px_10px_rgba(0,0,0,0.1)] no-underline"
      >
        {cluster.badge}
      </Link>

      <Link to={`/klaster/${slug}`} className="block relative h-[320px] max-md:h-[240px] overflow-hidden">
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
          {hoverIsRoute ? (
            <span className="btn-primary btn-small">
              <i className={cluster.hoverCta?.icon} /> {cluster.hoverCta?.label ?? 'Lihat Detail'}
            </span>
          ) : (
            <a href={hoverHref} className="btn-primary btn-small" onClick={handleScroll}>
              <i className={cluster.hoverCta?.icon} /> {cluster.hoverCta?.label ?? 'Lihat Detail'}
            </a>
          )}
        </div>
      </Link>

      <div className="p-8">
        <h3 className="text-[1.4rem] mb-2">
          <Link
            to={`/klaster/${slug}`}
            className="text-inherit no-underline hover:text-secondary transition-colors duration-400 ease-luxury"
          >
            {cluster.title}
          </Link>
        </h3>
        <p className="font-display font-bold text-secondary-dark text-[1.15rem] mb-4">{cluster.price}</p>
        <p className="text-mute text-[0.95rem] mb-6 font-light">{cluster.excerpt}</p>

        <div className="flex gap-5 max-md:gap-3 max-md:flex-wrap border-t border-b border-primary/8 py-4 mb-7">
          {cluster.specs?.map((spec) => (
            <span key={spec.label} className="text-[0.85rem] text-mute flex items-center gap-2">
              <i className={`${spec.icon} text-secondary`} /> {spec.label}
            </span>
          ))}
        </div>

        {ctaIsRoute ? (
          <Link to={ctaHref} className="btn-outline btn-full">
            {cluster.cta?.label ?? 'Selengkapnya'} <i className="fa-solid fa-chevron-right" />
          </Link>
        ) : (
          <a href={ctaHref} className="btn-outline btn-full" onClick={handleScroll}>
            {cluster.cta?.label ?? 'Selengkapnya'} <i className="fa-solid fa-chevron-right" />
          </a>
        )}
      </div>
    </article>
  );
}
