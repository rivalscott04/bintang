import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectGrid from '../components/projects/ProjectGrid';
import SectionHeader from '../components/ui/SectionHeader';
import { useProjects } from '../hooks/useProjects';
import { COPY } from '../utils/messages';

export default function ProjectsListPage() {
  const { projects, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'Proyek | Grand Kota Bintang';
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [projects, activeFilter]);

  return (
    <main id="content" className="pt-28 pb-24 bg-surface min-h-screen">
      <div className="container-x">
        <nav className="text-[0.85rem] text-mute mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-mute no-underline hover:text-secondary transition-colors">
            Beranda
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-primary font-medium">Proyek</span>
        </nav>

        <SectionHeader
          label="PORTOFOLIO PENGEMBANGAN"
          title="Semua Proyek Grand Kota Bintang"
          description="Proyek hunian dan komersial yang telah diluncurkan, sedang dikembangkan, serta rencana klaster berikutnya di dalam superblock kami."
        />

        <ProjectFilters activeFilter={activeFilter} onChange={setActiveFilter} />

        {error && (
          <p className="text-center text-mute text-sm mb-6" role="status">
            {COPY.apiFallback}
          </p>
        )}

        <ProjectGrid projects={filtered} emptyMessage="Belum ada proyek pada kategori ini." />
      </div>
    </main>
  );
}
