import { useEffect } from 'react';
import ContactForm from './ContactForm';

export default function ContactModal({ open, defaultCluster, defaultProject, onClose, onSubmit }) {
  useEffect(() => {
    if (!open) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
        aria-label="Tutup formulir kontak"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full sm:max-w-[520px] max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-surface rounded-t-lg sm:rounded-lg shadow-medium border border-primary/10"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-surface border-b border-primary/8 px-6 py-5 sm:px-8">
          <div>
            <p className="text-secondary font-display font-bold text-[0.75rem] tracking-[0.2em] uppercase mb-1">
              Konsultasi Gratis
            </p>
            <h2 id="contact-modal-title" className="font-display text-[1.35rem] text-primary leading-snug">
              Mulai Rencana Hidup Anda Hari Ini
            </h2>
            <p className="text-mute text-[0.9rem] mt-2 font-light leading-relaxed">
              Tim marketing kami siap membantu brosur, price list, promo, dan survei lokasi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-primary/10 text-mute hover:text-primary hover:border-secondary transition-colors flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:pb-8">
          <ContactForm
            key={`${defaultCluster ?? ''}-${defaultProject ?? ''}`}
            idPrefix="modal-"
            defaultCluster={defaultCluster}
            defaultProject={defaultProject}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
