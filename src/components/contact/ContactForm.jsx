import { useEffect, useMemo, useState } from 'react';
import { createLead } from '../../api/leads';
import { CLUSTER_OPTIONS } from '../../data/clusters';
import { useClusters } from '../../hooks/useClusters';
import { useContactSettings } from '../../hooks/useContactSettings';
import { buildContactLeadPayload, buildContactWhatsAppUrl } from '../../utils/contactLead';

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

function defaultMessageForProject(projectName) {
  if (!projectName) return '';
  return `Saya tertarik dengan proyek ${projectName}.`;
}

export default function ContactForm({ defaultCluster, defaultProject, onSubmit, idPrefix = '' }) {
  const { clusters } = useClusters();
  const { whatsappNumber } = useContactSettings();
  const clusterOptions = useMemo(() => {
    if (!clusters?.length) {
      return CLUSTER_OPTIONS;
    }

    return clusters.map((c) => ({
      value: c.name,
      label: c.title,
    }));
  }, [clusters]);

  const resolvedDefault = defaultCluster ?? clusterOptions[0]?.value ?? INITIAL_FORM.cluster;
  const resolvedMessage = defaultMessageForProject(defaultProject);

  const [form, setForm] = useState({
    ...INITIAL_FORM,
    cluster: resolvedDefault,
    message: resolvedMessage,
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      cluster: resolvedDefault,
      message: resolvedMessage || prev.message,
    }));
  }, [resolvedDefault, resolvedMessage]);

  useEffect(() => {
    if (clusterOptions.some((opt) => opt.value === form.cluster)) return;
    setForm((prev) => ({ ...prev, cluster: resolvedDefault }));
  }, [resolvedDefault, clusterOptions, form.cluster]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fieldId = (name) => `${idPrefix}lead-${name}`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      const firstKey = Object.keys(validation)[0];
      const el = document.getElementById(fieldId(firstKey));
      if (el) {
        el.focus();
      }
      return;
    }

    setSubmitting(true);

    const submitted = { ...form };

    try {
      await createLead(buildContactLeadPayload(submitted));
    } catch {
      // Tetap buka WhatsApp meski penyimpanan lead gagal.
    }

    const waUrl = buildContactWhatsAppUrl(submitted, whatsappNumber);
    window.location.assign(waUrl);

    onSubmit?.(submitted);
    setForm({ ...INITIAL_FORM, cluster: resolvedDefault, message: resolvedMessage });
    setSubmitting(false);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormField id={fieldId('name')} label="Nama Lengkap *" icon="fa-solid fa-user" error={errors.name}>
        <input
          id={fieldId('name')}
          type="text"
          placeholder="Masukkan nama lengkap Anda"
          value={form.name}
          onChange={updateField('name')}
          required
          className={inputClass(Boolean(errors.name))}
        />
      </FormField>

      <FormField id={fieldId('phone')} label="Nomor WhatsApp / HP *" icon="fa-solid fa-phone" error={errors.phone}>
        <input
          id={fieldId('phone')}
          type="tel"
          placeholder="Contoh: 081234567890"
          value={form.phone}
          onChange={updateField('phone')}
          required
          className={inputClass(Boolean(errors.phone))}
        />
      </FormField>

      <FormField id={fieldId('cluster')} label="Klaster yang Diminati" icon="fa-solid fa-building">
        <select
          id={fieldId('cluster')}
          value={form.cluster}
          onChange={updateField('cluster')}
          className={inputClass(false)}
        >
          {clusterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FormField>

      <div className="mb-6 flex flex-col gap-2">
        <label htmlFor={fieldId('message')} className={labelClass}>
          Catatan Tambahan (Opsional)
        </label>
        <textarea
          id={fieldId('message')}
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
            Kirim Permintaan Brosur & Hubungi GM <i className="fa-solid fa-paper-plane" />
          </>
        )}
      </button>
    </form>
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
