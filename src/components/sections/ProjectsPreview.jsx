import { Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { COPY } from '../../utils/messages';
import { getFeaturedProjects } from '../../utils/projects';
import ProjectGrid from '../projects/ProjectGrid';
import SectionHeader from '../ui/SectionHeader';

export default function ProjectsPreview() {
  const { projects, error } = useProjects();
  const featured = getFeaturedProjects(projects, 3);
  const preview = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-surface" aria-labelledby="projects-preview-title">
      <div className="container-x">
        <SectionHeader
          label="PORTOFOLIO PENGEMBANGAN"
          title="Proyek Grand Kota Bintang"
          description="Ikhtisar proyek hunian dan komersial yang telah diluncurkan, sedang dikembangkan, serta rencana klaster berikutnya."
        />

        {error && (
          <p className="text-center text-mute text-sm mb-6" role="status">
            {COPY.apiFallback}
          </p>
        )}

        <ProjectGrid projects={preview} emptyMessage="Belum ada proyek untuk ditampilkan." />

        <div className="text-center mt-12">
          <Link to="/projek" className="btn-primary">
            Lihat Semua Proyek <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
