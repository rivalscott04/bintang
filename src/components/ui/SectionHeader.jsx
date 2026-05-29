export default function SectionHeader({ label, title, description, align = 'center', className = '' }) {
  const isLeft = align === 'left';

  return (
    <div
      className={[
        isLeft ? 'text-left m-0' : 'text-center max-w-[650px] mx-auto mb-16',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-desc">{description}</p>}
    </div>
  );
}
