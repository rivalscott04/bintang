import { useState } from 'react';
import { CLUSTER_OPTIONS } from '../../data/clusters';
import {
  COMPANY_ADDRESS,
  COMPANY_WEBSITE,
  COMPANY_WEBSITE_DISPLAY,
  PHONE_DISPLAY,
  PHONE_NUMBER,
  WORK_HOURS,
} from '../../utils/constants';
import SectionHeader from '../ui/SectionHeader';

const INITIAL_FORM = {
  name: '',
  phone: '',
  cluster: 'Marocco',
  message: '',
};

const PHONE_REGEX = /^(08|\+62|62)[0-9]{8,12}$/;

function validate(form) {
  const errors = {};

  const trimmedName = form.name.trim();
  if (trimmedName.length === 0) {
    errors.name = 'Nama lengkap wajib diisi.';
  } else if (trimmedName.length < 3) {
    errors.name = 'Nama lengkap minimal 3 karakter.';
  }

  const cleanedPhone = form.phone.trim().replace(/[\s-]/g, '');
  if (cleanedPhone.length === 0) {
    errors.phone = 'Nomor WhatsApp wajib diisi.';
  } else if (!PHONE_REGEX.test(cleanedPhone)) {
    errors.phone = 'Format nomor WhatsApp tidak valid (contoh: 08123456789).';
  }

  return errors;
}

const labelClass = 'font-display font-bold text-[0.85rem] text-primary';

const inputClass = (hasError) =>
  [
    'w-full bg-white border rounded-sm pl-11 pr-4 py-3.5 outline-none font-body text-[0.95rem]',
    'transition-all duration-400 ease-luxury',
    hasError
      ? 'border-red-500 bg-red-50'
      : 'border-primary/8 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(197,168,128,0.15)]',
  ].join(' ');

export default function Contact({ onSubmit }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      const firstKey = Object.keys(validation)[0];
      const el = document.getElementById(`lead-${firstKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      onSubmit?.({ ...form });
      setForm(INITIAL_FORM);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container-x">
        <SectionHeader
          label="KONSULTASI GRATIS"
          title="Mulai Rencana Hidup Anda Hari Ini"
          description="Tim marketing professional kami siap membantu memberikan informasi brosur, price list, promo subsidi, dan menemani Anda melakukan survei lokasi."
        />

        <div className="grid grid-cols-[1fr_520px] max-lg:grid-cols-[1fr_420px] max-md:grid-cols-1 gap-12 max-lg:gap-8 items-start">
          <div className="flex flex-col gap-8">
            <div className="bg-surface rounded-md p-9 border border-primary/2">
              <h3 className="text-[1.4rem] mb-4">Marketing Gallery</h3>
              <p className="text-base text-mute mb-4 flex gap-3">
                <i className="fa-solid fa-location-dot text-secondary mt-1" /> {COMPANY_ADDRESS}
              </p>
              <p className="text-[0.95rem] text-mute flex gap-3">
                <i className="fa-solid fa-clock text-secondary mt-1" /> {WORK_HOURS}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <ContactLink
                href={`tel:${PHONE_NUMBER}`}
                icon="fa-solid fa-phone"
                label="Telepon Kantor"
                value={PHONE_DISPLAY}
              />
              <ContactLink
                href={COMPANY_WEBSITE}
                icon="fa-solid fa-globe"
                label="Website Resmi"
                value={COMPANY_WEBSITE_DISPLAY}
                external
              />
            </div>
          </div>

          <div className="bg-surface rounded-lg p-10 max-md:p-6 shadow-soft border border-primary/2">
            <form noValidate onSubmit={handleSubmit}>
              <FormField
                id="lead-name"
                label="Nama Lengkap *"
                icon="fa-solid fa-user"
                error={errors.name}
              >
                <input
                  id="lead-name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  value={form.name}
                  onChange={updateField('name')}
                  required
                  className={inputClass(Boolean(errors.name))}
                />
              </FormField>

              <FormField
                id="lead-phone"
                label="Nomor WhatsApp / HP *"
                icon="fa-solid fa-phone"
                error={errors.phone}
              >
                <input
                  id="lead-phone"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={form.phone}
                  onChange={updateField('phone')}
                  required
                  className={inputClass(Boolean(errors.phone))}
                />
              </FormField>

              <FormField id="lead-cluster" label="Klaster yang Diminati" icon="fa-solid fa-building">
                <select
                  id="lead-cluster"
                  value={form.cluster}
                  onChange={updateField('cluster')}
                  className={inputClass(false)}
                >
                  {CLUSTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="mb-6 flex flex-col gap-2">
                <label htmlFor="lead-message" className={labelClass}>
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  placeholder="Saya ingin menjadwalkan survei lokasi besok jam 10 pagi..."
                  value={form.message}
                  onChange={updateField('message')}
                  className="w-full bg-white border border-primary/8 rounded-sm px-4 py-3.5 outline-none font-body text-[0.95rem] resize-none transition-all duration-400 ease-luxury focus:border-secondary focus:shadow-[0_0_0_3px_rgba(197,168,128,0.15)]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary btn-full btn-large justify-center"
              >
                {submitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin" /> Mengirim Data...
                  </>
                ) : (
                  <>
                    Kirim Permintaan Brosur & Hubungi Sales{' '}
                    <i className="fa-solid fa-paper-plane" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, icon, label, value, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="bg-white border border-primary/6 rounded-sm p-5 flex items-center gap-5 no-underline text-ink transition-all duration-400 ease-luxury hover:border-secondary hover:shadow-soft hover:translate-x-1"
    >
      <span className="w-12 h-12 rounded-full bg-secondary/10 text-secondary-dark flex items-center justify-center text-[1.25rem]">
        <i className={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-[0.75rem] text-mute">{label}</span>
        <strong className="font-display font-bold text-[1.1rem] text-primary">{value}</strong>
      </div>
    </a>
  );
}

function FormField({ id, label, icon, error, children }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mute text-base z-10 pointer-events-none">
          <i className={icon} />
        </span>
        {children}
      </div>
      {error && <span className="text-[0.75rem] text-red-500 font-semibold">{error}</span>}
    </div>
  );
}
