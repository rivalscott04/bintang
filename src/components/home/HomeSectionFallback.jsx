/** Placeholder ringan saat chunk section beranda dimuat. */
export default function HomeSectionFallback({ minHeight = '480px' }) {
  return (
    <div
      className="animate-pulse bg-primary/5 rounded-md mx-auto w-full max-w-[1240px]"
      style={{ minHeight }}
      aria-hidden
    />
  );
}
