import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClusterSitePlan from '../components/clusters/ClusterSitePlan';
import ContextActionBar from '../components/explore/ContextActionBar';
import ProjectCard from '../components/projects/ProjectCard';
import VirtualTourModal from '../components/virtual-tour/VirtualTourModal';
import { useCluster } from '../hooks/useCluster';
import { useClusterTourUrl } from '../hooks/useClusterTourUrl';
import { useClusterVirtualTour } from '../hooks/useClusterVirtualTour';
import ContactCtaLink, { isContactLinkHref } from '../components/contact/ContactCtaLink';
import { projectPath } from '../utils/routes';
import { COPY } from '../utils/messages';

function ClusterDetailSkeleton() {
  return (
    <main id="content" className="pt-28 pb-24 min-h-screen">
      <div className="container-x animate-pulse space-y-8">
        <div className="h-4 w-48 bg-primary/10 rounded" />
        <div className="h-[360px] bg-primary/5 rounded-md" />
        <div className="h-8 w-2/3 bg-primary/10 rounded" />
      </div>
    </main>
  );
}

export default function ClusterDetailPage() {
  const { slug } = useParams();
  const { cluster, loading, error, notFound } = useCluster(slug);
  const clusterSlug = cluster?.slug ?? cluster?.id ?? slug;
  const { isTourOpen, openTour, closeTour } = useClusterTourUrl(clusterSlug);
  const { meta, scene, syncing, hasTour } = useClusterVirtualTour(clusterSlug);
  useEffect(() => {
    if (cluster?.title) {
      document.title = `${cluster.title} | Grand Kota Bintang`;
    }
  }, [cluster]);

  if (loading) {
    return <ClusterDetailSkeleton />;
  }

  if (notFound || !cluster) {
    return (
      <main id="content" className="pt-28 pb-24 min-h-screen">
        <div className="container-x text-center py-20">
          <h1 className="section-title mb-4">Klaster Tidak Ditemukan</h1>
          <p className="text-mute mb-8">Halaman klaster yang Anda cari tidak tersedia.</p>
          <Link to="/klaster" className="btn-primary">
            Kembali ke Daftar Klaster
          </Link>
        </div>
      </main>
    );
  }

  const projects = cluster.projects ?? [];
  const ctaHref = cluster.cta?.href ?? '/#contact';
  const ctaIsRoute = ctaHref.startsWith('/') && !ctaHref.startsWith('/#');
  const ctaIsContact = isContactLinkHref(ctaHref);
  const firstProject = projects[0];

  return (
    <main id="content" className="pt-28 pb-24 max-md:pb-32 bg-white min-h-screen">
      <article className="container-x">
        <nav className="text-[0.85rem] text-mute mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-mute no-underline hover:text-secondary transition-colors">
            Beranda
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <Link to="/klaster" className="text-mute no-underline hover:text-secondary transition-colors">
            Klaster Hunian
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-primary font-medium">{cluster.title}</span>
        </nav>

        {error && (
          <p className="text-mute text-sm mb-6" role="status">
            {COPY.apiFallback}
          </p>
        )}

        <div className="relative rounded-md overflow-hidden shadow-medium mb-10 h-[min(420px,50vh)] max-md:h-[260px]">
          <img
            src={cluster.image}
            alt={cluster.imageAlt}
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-5 left-5 bg-primary text-secondary-light px-4 py-1.5 rounded-full font-display font-bold text-[0.8rem] tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            {cluster.badge}
          </span>
        </div>

        <div className="max-w-3xl mb-12">
          <h1 className="section-title mb-3">{cluster.title}</h1>
          <p className="font-display font-bold text-secondary-dark text-[1.25rem] mb-4">{cluster.price}</p>
          <p className="text-mute text-[1.05rem] font-light leading-relaxed mb-6">{cluster.excerpt}</p>

          {cluster.specs?.length > 0 && (
            <div className="flex flex-wrap gap-5 border-t border-b border-primary/8 py-4 mb-8">
              {cluster.specs.map((spec) => (
                <span key={spec.label} className="text-[0.9rem] text-mute flex items-center gap-2">
                  <i className={`${spec.icon} text-secondary`} aria-hidden />
                  {spec.label}
                </span>
              ))}
            </div>
          )}

          {cluster.description && (
            <p className="text-mute leading-relaxed mb-8">{cluster.description}</p>
          )}

          <div className="flex flex-wrap gap-3">
            {hasTour && (
              <button
                type="button"
                onClick={openTour}
                disabled={syncing}
                className="btn-primary min-h-[48px]"
              >
                <i className="fa-solid fa-vr-cardboard" />
                {syncing ? 'Memuat...' : 'Tur 3D'}
              </button>
            )}
            {ctaIsContact ? (
              <ContactCtaLink href={ctaHref} cluster={cluster.name} className="btn-outline">
                {cluster.cta?.label ?? 'Hubungi kami'} <i className="fa-solid fa-chevron-right" />
              </ContactCtaLink>
            ) : ctaIsRoute ? (
              <Link to={ctaHref} className="btn-outline">
                {cluster.cta?.label ?? 'Hubungi kami'} <i className="fa-solid fa-chevron-right" />
              </Link>
            ) : (
              <a href={ctaHref} className="btn-outline">
                {cluster.cta?.label ?? 'Hubungi kami'} <i className="fa-solid fa-chevron-right" />
              </a>
            )}
          </div>
        </div>

        {(cluster.sitePlanImage || cluster.sitePlanBlocks?.length > 0) && (
          <section className="mb-16" aria-labelledby="site-plan-heading">
            <h2 id="site-plan-heading" className="font-display text-[1.5rem] text-primary mb-2">
              Site Plan & Ketersediaan Unit
            </h2>
            <p className="text-mute text-[0.95rem] mb-8 max-w-2xl">Klik blok pada denah.</p>
            <ClusterSitePlan
              image={cluster.sitePlanImage}
              imageAlt={`Site plan ${cluster.title}`}
              blocks={cluster.sitePlanBlocks}
            />
          </section>
        )}

        {projects.length > 0 && (
          <section aria-labelledby="cluster-projects-heading">
            <h2 id="cluster-projects-heading" className="font-display text-[1.5rem] text-primary mb-6">
              Proyek di Klaster Ini
            </h2>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug ?? project.id}
                  project={{ ...project, clusterSlug: project.clusterSlug ?? clusterSlug }}
                />
              ))}
            </div>
          </section>
        )}

        <p className="mt-12 text-center">
          <Link to="/klaster" className="text-secondary font-display font-semibold no-underline hover:underline">
            ← Semua klaster
          </Link>
        </p>
      </article>

      <VirtualTourModal open={isTourOpen} onClose={closeTour} tourConfig={scene} meta={meta} />

      <ContextActionBar
        items={[
          ...(hasTour
            ? [
                {
                  key: 'tour',
                  label: 'Tur 3D',
                  icon: 'fa-solid fa-vr-cardboard',
                  variant: 'primary',
                  onClick: openTour,
                },
              ]
            : []),
          ...(firstProject
            ? [
                {
                  key: 'project',
                  label: 'Lihat Unit',
                  icon: 'fa-solid fa-building',
                  to: projectPath({ ...firstProject, clusterSlug }),
                },
              ]
            : []),
          {
            key: 'contact',
            label: 'Hubungi',
            icon: 'fa-solid fa-envelope',
            to: '/#contact',
            contactCluster: cluster.name,
          },
        ]}
      />
    </main>
  );
}
