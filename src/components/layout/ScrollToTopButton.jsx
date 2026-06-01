import { useScrollPastThreshold } from '../../hooks/useScrollPastThreshold';

export default function ScrollToTopButton() {
  const visible = useScrollPastThreshold(320);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={[
        'fixed z-150 flex items-center justify-center',
        'w-11 h-11 min-w-[44px] min-h-[44px] rounded-full',
        'bg-primary text-secondary border border-secondary/30',
        'shadow-[0_6px_20px_rgba(0,0,0,0.18)]',
        'transition-all duration-400 ease-luxury',
        'hover:bg-secondary hover:text-primary hover:scale-105',
        'right-5 md:right-[30px]',
        'bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-[108px]',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none',
      ].join(' ')}
    >
      <i className="fa-solid fa-chevron-up text-lg" aria-hidden />
    </button>
  );
}
