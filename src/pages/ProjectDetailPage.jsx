import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ContextActionBar from '../components/explore/ContextActionBar';
import { PROJECT_STATUS } from '../data/projects';
import { useClusterVirtualTour } from '../hooks/useClusterVirtualTour';
import { useProject } from '../hooks/useProject';
import { createLead } from '../api/leads';
import { useContactSettings } from '../hooks/useContactSettings';
import { COPY } from '../utils/messages';
import {
  clusterPath,
  clusterTourPath,
  inferClusterSlug,
  isLegacyProjectPath,
  projectPath,
} from '../utils/routes';

function ProjectDetailSkeleton() {
  return (
    <main id="content" className="pt-28 pb-24 min-h-screen">
      <div className="container-x animate-pulse space-y-8">
        <div className="h-4 w-48 bg-primary/10 rounded" />
        <div className="h-[360px] bg-primary/5 rounded-md" />
        <div className="h-8 w-2/3 bg-primary/10 rounded" />
        <div className="h-24 bg-primary/5 rounded" />
      </div>
    </main>
  );
}

export default function ProjectDetailPage() {
  const { slug, clusterSlug: routeClusterSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { project, loading, error, notFound } = useProject(slug);
  const resolvedClusterSlug = routeClusterSlug ?? project?.clusterSlug ?? inferClusterSlug(project);
  const { hasTour } = useClusterVirtualTour(resolvedClusterSlug);
  const { openProjectWhatsApp } = useContactSettings();
  const isLegacyRoute = isLegacyProjectPath(location.pathname, routeClusterSlug);
  
  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Sidebar form state
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Grand Kota Bintang`;
      setActiveImageIndex(0);
      setFormData({ name: '', phone: '' });
    }
  }, [project?.slug]);

  useEffect(() => {
    if (!project || loading) return;
    const canonical = projectPath(project);
    if (isLegacyRoute && project.clusterSlug) {
      navigate(canonical, { replace: true });
      return;
    }
    if (
      routeClusterSlug &&
      project.clusterSlug &&
      routeClusterSlug !== project.clusterSlug
    ) {
      navigate(projectPath(project), { replace: true });
    }
  }, [project, loading, isLegacyRoute, navigate, routeClusterSlug]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (notFound || !project) {
    return (
      <main id="content" className="pt-28 pb-24 min-h-screen">
        <div className="container-x text-center py-20">
          <h1 className="section-title mb-4">Proyek Tidak Ditemukan</h1>
          <p className="text-mute mb-8">Halaman proyek yang Anda cari tidak tersedia.</p>
          <Link to="/projek" className="btn-primary">
            Kembali ke Daftar Proyek
          </Link>
        </div>
      </main>
    );
  }

  const statusMeta = PROJECT_STATUS[project.status] ?? PROJECT_STATUS.planned;
  const clusterSlug = resolvedClusterSlug;
  const clusterLink = clusterSlug
    ? clusterPath(clusterSlug)
    : project.clusterAnchor
      ? project.clusterAnchor.startsWith('/')
        ? project.clusterAnchor
        : `/${project.clusterAnchor}`
      : '/klaster';
  const tourLink = clusterSlug ? clusterTourPath(clusterSlug) : null;

  // Prepare images array for gallery
  const galleryImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  // Helper to dynamically choose elegant icons for highlights
  const getHighlightIcon = (text) => {
    const textLower = text.toLowerCase();
    if (textLower.includes('kamar') || textLower.includes('tidur') || textLower.includes('mandi')) {
      return 'fa-solid fa-bed';
    }
    if (textLower.includes('carport') || textLower.includes('parkir')) {
      return 'fa-solid fa-square-parking';
    }
    if (textLower.includes('tol') || textLower.includes('akses')) {
      return 'fa-solid fa-road';
    }
    if (textLower.includes('lantai')) {
      return 'fa-solid fa-building';
    }
    if (textLower.includes('kunjungan') || textLower.includes('residen') || textLower.includes('market')) {
      return 'fa-solid fa-people-group';
    }
    if (textLower.includes('amenitas') || textLower.includes('lokasi')) {
      return 'fa-solid fa-location-dot';
    }
    if (textLower.includes('tur') || textLower.includes('virtual') || textLower.includes('3d')) {
      return 'fa-solid fa-vr-cardboard';
    }
    return 'fa-solid fa-circle-check';
  };

  // Gallery Navigation Handlers
  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await createLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        project_slug: project.slug,
        project_name: project.name,
        cluster_name: project.cluster ?? null,
        source: 'project_detail',
      });
    } catch {
      // Tetap lanjut ke WhatsApp meski penyimpanan lead gagal.
    } finally {
      openProjectWhatsApp({
        name: formData.name,
        phone: formData.phone,
        projectName: project.name,
        clusterName: project.cluster,
      });
      setFormLoading(false);
    }
  };

  return (
    <main id="content" className="pt-28 pb-24 max-md:pb-32 bg-white min-h-screen">
      <article className="container-x">
        {/* Breadcrumb */}
        <nav className="text-[0.85rem] text-mute mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-mute no-underline hover:text-secondary transition-colors">
            Beranda
          </Link>
          <span className="mx-2 opacity-50">/</span>
          {clusterSlug ? (
            <>
              <Link
                to={clusterPath(clusterSlug)}
                className="text-mute no-underline hover:text-secondary transition-colors"
              >
                {project.cluster}
              </Link>
              <span className="mx-2 opacity-50">/</span>
            </>
          ) : (
            <>
              <Link to="/projek" className="text-mute no-underline hover:text-secondary transition-colors">
                Proyek
              </Link>
              <span className="mx-2 opacity-50">/</span>
            </>
          )}
          <span className="text-primary font-medium">{project.name}</span>
        </nav>

        {error && (
          <p className="text-mute text-sm mb-6" role="status">
            {COPY.apiFallback}
          </p>
        )}

        <div className="grid grid-cols-[1fr_360px] max-lg:grid-cols-1 gap-12 max-lg:gap-10">
          <div>
            {/* Title Area */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {clusterSlug ? (
                <Link
                  to={clusterPath(clusterSlug)}
                  className="inline-flex items-center gap-1.5 bg-primary text-secondary-light px-3 py-1.5 rounded-full font-display font-semibold text-[0.85rem] no-underline hover:opacity-90 transition-opacity"
                >
                  <i className="fa-solid fa-layer-group text-[0.75rem]" aria-hidden />
                  Klaster {project.cluster}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-primary text-secondary-light px-3 py-1.5 rounded-full font-display font-semibold text-[0.85rem]">
                  <i className="fa-solid fa-layer-group text-[0.75rem]" aria-hidden />
                  Klaster {project.cluster}
                </span>
              )}
              <span className="text-mute font-medium text-sm">{project.clusterType}</span>
            </div>

            <h1 className="section-title text-left mb-2 text-primary font-display font-extrabold">{project.name}</h1>
            <p className="text-secondary-dark font-display font-bold text-2xl mb-3">
              {project.priceRange || 'Hubungi Marketing'}
            </p>
            {project.excerpt && (
              <p className="text-primary/75 font-body text-lg font-medium leading-relaxed mb-4 max-w-2xl">
                {project.excerpt}
              </p>
            )}
            <div className="inline-block border border-secondary/20 bg-secondary/5 text-secondary-dark px-3 py-1 rounded-sm text-xs font-display font-bold tracking-wider uppercase mb-8">
              {project.phase}
            </div>

            {/* Interactive Image Gallery */}
            <div className="relative mb-10 group">
              <div className="relative rounded-md overflow-hidden shadow-medium h-[420px] max-md:h-[260px] bg-primary/5">
                <img
                  key={galleryImages[activeImageIndex]}
                  src={galleryImages[activeImageIndex]}
                  alt={`${project.name} — tampilan ${activeImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover animate-fadeIn transition-opacity duration-500 ease-luxury"
                />
                
                {/* Navigation Arrows (Only show if multiple images) */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/80 text-white flex items-center justify-center transition-colors cursor-pointer border-0"
                      aria-label="Gambar sebelumnya"
                    >
                      <i className="fa-solid fa-chevron-left" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/40 hover:bg-primary/80 text-white flex items-center justify-center transition-colors cursor-pointer border-0"
                      aria-label="Gambar berikutnya"
                    >
                      <i className="fa-solid fa-chevron-right" />
                    </button>
                  </>
                )}
                
                {/* Status Badge overlay */}
                <span
                  className={[
                    'absolute top-5 left-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
                    'font-display font-bold text-[0.8rem] tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.2)]',
                    statusMeta.badgeClass,
                  ].join(' ')}
                >
                  <i className={statusMeta.icon} aria-hidden />
                  {statusMeta.label}
                </span>

                {/* Counter overlay */}
                {galleryImages.length > 1 && (
                  <span className="absolute bottom-5 right-5 bg-black/60 text-white font-body px-3 py-1 rounded-full text-xs tracking-wider font-semibold">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                )}
              </div>

              {/* Thumbnails list */}
              {galleryImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`Lihat gambar ${idx + 1}`}
                      aria-current={activeImageIndex === idx ? 'true' : undefined}
                      className={[
                        'w-20 h-14 rounded-sm overflow-hidden border-2 cursor-pointer transition-all duration-300 shrink-0',
                        activeImageIndex === idx ? 'border-secondary shadow-soft scale-102' : 'border-transparent opacity-60 hover:opacity-100',
                      ].join(' ')}
                    >
                      <img src={img} alt="Miniatur" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-display font-bold text-primary text-xl mb-4 border-b border-primary/8 pb-2">Deskripsi Proyek</h2>
              <p className="text-mute text-[1.05rem] font-light leading-[1.85]">{project.description}</p>
            </div>

            {/* Highlights Visual Grid */}
            {project.highlights?.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display font-bold text-primary text-xl mb-6 border-b border-primary/8 pb-2">Keunggulan & Fasilitas</h2>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                  {project.highlights.map((item) => {
                    const iconClass = getHighlightIcon(item);
                    return (
                      <div
                        key={item}
                        className="flex gap-4 p-4 rounded-sm bg-primary/1 border border-primary/5 hover:border-secondary/20 hover:bg-primary/2 transition-all duration-300"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/15 text-secondary-dark shrink-0">
                          <i className={`${iconClass} text-base`} aria-hidden />
                        </div>
                        <div className="flex items-center">
                          <span className="text-mute font-body text-[0.95rem] leading-snug">{item}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Technical Specifications Table */}
            {project.specifications && (
              <div className="mb-10 animate-fadeIn">
                <h2 className="font-display font-bold text-primary text-xl mb-6 border-b border-primary/8 pb-2">Spesifikasi Teknis & Konstruksi</h2>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 border-t border-l border-primary/8 rounded-sm overflow-hidden bg-white shadow-soft">
                  {Object.entries(project.specifications).map(([key, value]) => (
                    <div key={key} className="p-4 px-5 border-r border-b border-primary/8 flex flex-col gap-1 hover:bg-primary/1 transition-colors">
                      <span className="text-[0.75rem] font-display font-bold tracking-wider text-secondary-dark uppercase">{key}</span>
                      <span className="text-primary font-body text-[0.95rem] leading-relaxed">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Leads Capture Sidebar Card */}
          <div>
            <aside
              id="project-lead-form"
              className="bg-primary text-white rounded-md p-8 shadow-medium h-fit sticky top-28 border border-white/5 scroll-mt-28"
            >
              <div>
                <span className="font-display font-bold text-[0.75rem] tracking-widest text-secondary uppercase block mb-1">
                  Eksklusif Offer
                </span>
                <h3 className="font-display font-extrabold text-white text-xl mb-4">Dapatkan Brosur & Price List</h3>
                <p className="text-white/80 font-body text-[0.9rem] font-light leading-relaxed mb-6">
                  Isi nama & WhatsApp, lalu lanjut ke chat GM dengan pesan sudah terisi.
                </p>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name-input" className="sr-only">Nama Lengkap</label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Nama Lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm placeholder-white/40 focus:outline-none focus:border-secondary focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone-input" className="sr-only">Nomor WhatsApp</label>
                    <input
                      id="phone-input"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Nomor WhatsApp (Contoh: 0812...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white font-body text-sm placeholder-white/40 focus:outline-none focus:border-secondary focus:bg-white/10 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="btn-primary btn-full justify-center bg-secondary text-primary border-secondary"
                  >
                    {formLoading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin mr-2" aria-hidden /> Membuka WhatsApp...
                      </>
                    ) : (
                      <>
                        Minta Brosur Lengkap <i className="fa-brands fa-whatsapp text-lg" aria-hidden />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                    {hasTour && tourLink && (
                      <Link
                        to={tourLink}
                        className="btn-primary btn-full justify-center bg-secondary text-primary border-secondary"
                      >
                        Tur 3D <i className="fa-solid fa-vr-cardboard" />
                      </Link>
                    )}
                    {(clusterSlug || project.clusterAnchor) && (
                      <Link
                        to={clusterLink}
                        className="btn-outline btn-full justify-center border-white/30 text-white hover:bg-white hover:text-primary"
                      >
                        {clusterSlug ? 'Lihat Halaman Klaster' : 'Info Kawasan'}{' '}
                        <i className="fa-solid fa-chevron-right" />
                      </Link>
                    )}
                    <Link
                      to={clusterSlug ? clusterPath(clusterSlug) : '/projek'}
                      className="text-center text-white/50 hover:text-white text-sm no-underline transition-colors mt-1"
                    >
                      {clusterSlug ? '← Kembali ke klaster' : '← Semua proyek'}
                    </Link>
                  </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <ContextActionBar
        items={[
          ...(hasTour && tourLink
            ? [
                {
                  key: 'tour',
                  label: 'Tur 3D',
                  icon: 'fa-solid fa-vr-cardboard',
                  variant: 'primary',
                  to: tourLink,
                },
              ]
            : []),
          ...(clusterSlug
            ? [
                {
                  key: 'cluster',
                  label: 'Klaster',
                  icon: 'fa-solid fa-layer-group',
                  to: clusterPath(clusterSlug),
                },
              ]
            : []),
          {
            key: 'brochure',
            label: 'Brosur',
            icon: 'fa-solid fa-file-lines',
            to: '#project-lead-form',
          },
        ]}
      />
    </main>
  );
}

