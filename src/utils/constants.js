export const WHATSAPP_NUMBER = '6281234567890';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Halo GM Grand Kota Bintang, saya tertarik dengan unit perumahan. Boleh minta brosur terbaru dan price list-nya?';

export function buildWhatsAppUrl(text = WHATSAPP_DEFAULT_MESSAGE, whatsappNumber = WHATSAPP_NUMBER) {
  const base = `https://wa.me/${whatsappNumber}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_URL = buildWhatsAppUrl();

/**
 * Pesan pre-format brosur dari halaman detail proyek.
 * Nomor dari API `/contact-settings` bila `VITE_API_BASE_URL` aktif.
 */
export function buildProjectWhatsAppUrl({
  name,
  phone,
  projectName,
  clusterName,
  whatsappNumber = WHATSAPP_NUMBER,
}) {
  const trimmedName = name?.trim() ?? '';
  const project = projectName?.trim() ?? 'unit Grand Kota Bintang';
  const cluster = clusterName?.trim();

  const lines = [
    'Halo Grand Kota Bintang,',
    `Perkenalkan, saya ${trimmedName}.`,
    cluster
      ? `Saya tertarik proyek ${project} (Klaster ${cluster}).`
      : `Saya tertarik proyek ${project}.`,
    '',
    'Mohon kirim brosur & price list. Terima kasih.',
  ];

  return buildWhatsAppUrl(lines.join('\n'), whatsappNumber);
}

/** Buka WhatsApp (app di HP, web di desktop). */
export function openWhatsAppUrl(url) {
  window.location.assign(url);
}

export const VIRTUAL_TOUR_URL = 'https://grandkotabintang.com/virtualtour/';

export const PHONE_NUMBER = '+62211234567';
export const PHONE_DISPLAY = '(021) 1234-567';

export const COMPANY_WEBSITE = 'https://grandkotabintang.com/';
export const COMPANY_WEBSITE_DISPLAY = 'grandkotabintang.com';

export const COMPANY_ADDRESS =
  'Jl. Kota Bintang Boulevard No. B9, Grand Kota Bintang, Jakasampurna, Bekasi Barat, Bekasi 17145';

export const WORK_HOURS = 'Buka Setiap Hari: 08:30 - 19:30 WIB';

export const GKB_CENTER = [-6.2485143, 106.957341];
