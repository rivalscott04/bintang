import ProjectCard from './ProjectCard';

function ProjectSkeleton() {
  return (
    <div
      className="rounded-md border border-primary/5 bg-surface h-[420px] animate-pulse"
      aria-hidden
    />
  );
}

export default function ProjectGrid({ projects, loading = false, emptyMessage }) {
  if (loading && projects.length === 0) {
    return (
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-lg:gap-5">
        {Array.from({ length: 3 }, (_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="text-center text-mute py-12">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6 max-lg:gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
