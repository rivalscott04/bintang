import { WHATSAPP_URL } from '../utils/constants';

export const STICKY_NAV_ITEMS = [
  { id: 'clusters', icon: 'fa-solid fa-building-user', label: 'Proyek', href: '#clusters' },
  { id: 'amenities', icon: 'fa-solid fa-map-location-dot', label: 'Lokasi', href: '#amenities' },
  {
    id: 'wa',
    icon: 'fa-brands fa-whatsapp',
    label: 'Chat Sales',
    href: WHATSAPP_URL,
    external: true,
    highlight: true,
  },
  { id: 'kpr', icon: 'fa-solid fa-calculator', label: 'KPR', href: '#kpr-calculator' },
  { id: 'contact', icon: 'fa-solid fa-envelope', label: 'Kontak', href: '#contact' },
];
