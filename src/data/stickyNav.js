import { WHATSAPP_URL } from '../utils/constants';

/** Mobile bottom bar — selaras dengan header (tanpa Tur Virtual global). */
export const STICKY_NAV_ITEMS = [
  { id: 'clusters', icon: 'fa-solid fa-layer-group', label: 'Klaster', to: '/klaster' },
  { id: 'projects', icon: 'fa-solid fa-building-user', label: 'Unit', to: '/projek' },
  { id: 'amenities', icon: 'fa-solid fa-map-location-dot', label: 'Lokasi', to: '/lokasi' },
  {
    id: 'wa',
    icon: 'fa-brands fa-whatsapp',
    label: 'Chat GM',
    href: WHATSAPP_URL,
    external: true,
    highlight: true,
  },
  { id: 'contact', icon: 'fa-solid fa-envelope', label: 'Kontak', to: '/#contact' },
];
