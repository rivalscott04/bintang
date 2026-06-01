import { Link } from 'react-router-dom';

/** Aksi kontekstual sticky di mobile. */
export default function ContextActionBar({ items }) {
  if (!items?.length) return null;

  return (
    <div
      className={[
        'fixed bottom-0 left-0 right-0 z-900 md:hidden',
        'bg-white/95 backdrop-blur-lg border-t border-primary/10',
        'px-4 py-3 flex gap-2 safe-area-pb',
      ].join(' ')}
      role="toolbar"
      aria-label="Aksi cepat"
    >
      {items.map((item) => {
        const className = [
          'flex-1 min-h-[44px] flex items-center justify-center gap-2 rounded-sm',
          'font-display font-semibold text-[0.8rem] no-underline transition-colors',
          item.variant === 'primary'
            ? 'bg-secondary text-primary'
            : 'border border-primary/15 text-primary bg-white',
        ].join(' ');

        if (item.onClick) {
          return (
            <button key={item.key} type="button" onClick={item.onClick} className={className}>
              {item.icon && <i className={item.icon} aria-hidden />}
              {item.label}
            </button>
          );
        }

        return (
          <Link key={item.key} to={item.to} className={className}>
            {item.icon && <i className={item.icon} aria-hidden />}
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
