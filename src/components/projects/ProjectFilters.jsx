import { PROJECT_FILTERS } from '../../data/projects';

export default function ProjectFilters({ activeFilter, onChange }) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 mb-12 max-md:gap-1.5"
      role="tablist"
      aria-label="Filter status proyek"
    >
      {PROJECT_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.id)}
            className={[
              'px-4 py-2 rounded-full font-display font-semibold text-[0.85rem]',
              'border transition-all duration-400 ease-luxury min-h-[44px]',
              isActive
                ? 'bg-primary text-white border-primary shadow-soft'
                : 'bg-white text-mute border-primary/10 hover:border-secondary/40 hover:text-primary',
            ].join(' ')}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
