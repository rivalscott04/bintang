import { Link } from 'react-router-dom';
import { PROJECT_STATUS } from '../../data/projects';
import { projectPath } from '../../utils/routes';

export default function ProjectCard({ project }) {
  const statusMeta = PROJECT_STATUS[project.status] ?? PROJECT_STATUS.planned;
  const detailTo = projectPath(project);

  return (
    <article className="group flex flex-col bg-surface rounded-md overflow-hidden shadow-soft border border-primary/3 transition-all duration-400 ease-luxury hover:-translate-y-1.5 hover:shadow-medium">
      <Link to={detailTo} className="relative h-[200px] max-md:h-[180px] overflow-hidden block">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={640}
          height={427}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-400 ease-luxury group-hover:scale-[1.06]"
        />
        <span
          className={[
            'absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full',
            'font-display font-bold text-[0.7rem] tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
            statusMeta.badgeClass,
          ].join(' ')}
        >
          <i className={`${statusMeta.icon} text-[0.65rem]`} aria-hidden />
          {statusMeta.label}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[0.8rem]">
          <span className="inline-flex items-center gap-1.5 bg-primary text-secondary-light px-2.5 py-1 rounded-full font-display font-semibold tracking-wide">
            <i className="fa-solid fa-layer-group text-[0.7rem]" aria-hidden />
            Klaster {project.cluster}
          </span>
          <span className="text-mute font-medium">{project.clusterType}</span>
        </div>

        <h3 className="text-[1.15rem] leading-snug">
          <Link
            to={detailTo}
            className="text-inherit no-underline hover:text-secondary transition-colors duration-400 ease-luxury"
          >
            {project.name}
          </Link>
        </h3>
        <p className="text-secondary-dark font-display font-semibold text-[0.85rem]">{project.phase}</p>
        <p className="text-mute text-[0.92rem] font-light leading-relaxed flex-1">{project.excerpt}</p>

        <Link to={detailTo} className="btn-outline btn-full mt-1">
          Lihat Detail Proyek <i className="fa-solid fa-chevron-right" />
        </Link>
      </div>
    </article>
  );
}
