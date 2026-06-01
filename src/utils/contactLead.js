import { buildWhatsAppUrl } from './constants';

/** Payload `POST /api/leads` dari form kontak beranda. */
export function buildContactLeadPayload(form) {
  const name = form.name.trim();
  const phone = form.phone.trim();
  const cluster = form.cluster.trim();
  const message = form.message.trim();

  return {
    name,
    phone,
    project_name: cluster
      ? `Konsultasi · Klaster ${cluster}`
      : 'Konsultasi Grand Kota Bintang',
    cluster_name: cluster || null,
    visitor_message: message || null,
    source: 'contact_form',
  };
}

/** URL WhatsApp setelah submit form kontak. */
export function buildContactWhatsAppUrl(
  { name, phone, cluster, message },
  whatsappNumber,
) {
  const lines = [
    'Halo Grand Kota Bintang,',
    `Perkenalkan, saya ${name}.`,
    cluster ? `Saya tertarik dengan klaster ${cluster}.` : 'Saya ingin konsultasi unit di Grand Kota Bintang.',
    'Mohon kirim brosur & price list. Terima kasih.',
  ];

  if (message) {
    lines.push('', `Catatan: ${message}`);
  }

  if (phone) {
    lines.push('', `Nomor saya: ${phone}`);
  }

  return buildWhatsAppUrl(lines.join('\n'), whatsappNumber);
}
