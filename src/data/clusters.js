export const CLUSTERS = [
  {
    id: 'marocco',
    badge: 'Residential',
    image: '/assets/cluster_marocco.webp',
    imageAlt: 'Cluster Marocco Modern Luxury Townhouses',
    title: 'Cluster Marocco Townhouses',
    price: 'Mulai Rp 1.8 Miliar',
    excerpt:
      'Rumah tinggal tropis modern 2 lantai dengan fasad mewah batu alam, jendela panorama besar, dan tata ruang luas yang memaksimalkan sirkulasi udara.',
    specs: [
      { icon: 'fa-solid fa-bed', label: '3+1 Kamar' },
      { icon: 'fa-solid fa-bath', label: '3 Kamar Mandi' },
      { icon: 'fa-solid fa-car-side', label: '2 Carport' },
    ],
    hoverCta: {
      icon: 'fa-solid fa-vr-cardboard',
      label: 'Tur 3D',
      href: '#virtual-tour',
    },
    cta: {
      label: 'Minta Price List',
      href: '#contact',
    },
  },
  {
    id: 'stellar',
    badge: 'Commercial',
    image: '/assets/stellar_avenue.webp',
    imageAlt: 'Stellar Avenue Modern Retail Shophouses',
    title: 'Stellar Avenue Commercial',
    price: 'Mulai Rp 2.9 Miliar',
    excerpt:
      'Pusat gaya hidup dan bisnis kuliner berkonsep terbuka (alfresco) dengan aliran air dan taman hijau. Lokasi strategis dengan potensi kunjungan tinggi.',
    specs: [
      { icon: 'fa-solid fa-store', label: '3 Lantai' },
      { icon: 'fa-solid fa-square', label: 'Luas 180 m²' },
      { icon: 'fa-solid fa-circle-p', label: 'Area Parkir Luas' },
    ],
    hoverCta: {
      icon: 'fa-solid fa-file-invoice-dollar',
      label: 'Tanya Unit',
      href: '#contact',
    },
    cta: {
      label: 'Minta Brosur Ruko',
      href: '#contact',
    },
  },
];

export const CLUSTER_OPTIONS = [
  { value: 'Marocco', label: 'Cluster Marocco Townhouse' },
  { value: 'Roma', label: 'Cluster Roma Residence' },
  { value: 'Stellar', label: 'Stellar Avenue Shophouse' },
  { value: 'Amsterdam', label: 'Shophouse Amsterdam' },
];
