export default function Toast({ toast, onClose }) {
  const isSuccess = !toast || toast.type === 'success';
  const accent = isSuccess ? '#c5a880' : '#ff4d4d';
  const iconClass = isSuccess ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
  const isActive = Boolean(toast);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'fixed top-[30px] right-[30px] z-2000 max-w-[420px] w-[calc(100vw-60px)]',
        'flex items-center justify-between gap-5 px-6 py-5',
        'bg-primary text-white border border-white/10 rounded-md shadow-[0_20px_50px_rgba(7,15,30,0.3)]',
        'transition-all duration-400 ease-luxury',
        isActive ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-[-150%] opacity-0 pointer-events-none',
      ].join(' ')}
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <div className="flex items-center gap-4">
        <span className="text-[1.8rem]">
          <i className={iconClass} style={{ color: accent }} />
        </span>
        <div>
          <strong className="font-display text-white text-base block mb-1">
            {toast?.title ?? 'Notifikasi'}
          </strong>
          <p className="text-[0.8rem] text-white/70 leading-snug">{toast?.message ?? ''}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="bg-transparent border-none text-white/40 text-[1.1rem] cursor-pointer transition-colors hover:text-white"
      >
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}
