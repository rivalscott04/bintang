/** Satu hentian scroll di beranda (tinggi mengikuti konten). */
export default function HomeSnapSection({ children, fullViewport = false, className = '', ariaLabel }) {
  return (
    <div
      className={[
        'home-snap-section',
        fullViewport && 'home-snap-section--viewport',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(ariaLabel && { 'aria-label': ariaLabel, role: 'region' })}
    >
      {children}
    </div>
  );
}
