export const CLUSTERS = [
  {
    id: 'marocco',
    slug: 'marocco',
    featured: true,
    badge: 'Residential',
    image: '/assets/cluster_marocco.webp',
    imageAlt: 'Cluster Marocco Modern Luxury Townhouses',
    title: 'Cluster Marocco Townhouses',
    price: 'Mulai Rp 1.8 Miliar',
    excerpt:
      'Rumah tinggal tropis modern 2 lantai dengan fasad mewah batu alam, jendela panorama besar, dan tata ruang luas yang memaksimalkan sirkulasi udara.',
    description:
      'Cluster Marocco adalah hunian tropis modern 2 lantai dengan fasad batu alam dan tata ruang lapang.',
    specs: [
      { icon: 'fa-solid fa-bed', label: '3+1 Kamar' },
      { icon: 'fa-solid fa-bath', label: '3 Kamar Mandi' },
      { icon: 'fa-solid fa-car-side', label: '2 Carport' },
    ],
    hoverCta: {
      icon: 'fa-solid fa-vr-cardboard',
      label: 'Tur 3D',
      href: '/klaster/marocco?tour=1',
    },
    cta: {
      label: 'Minta Price List',
      href: '/#contact',
    },
    sitePlanImage: '/assets/cluster_marocco.webp',
    sitePlanBlocks: [
      { id: 'm-a1', label: 'Blok A1', status: 'available', x: 8, y: 18, width: 24, height: 20 },
      { id: 'm-a2', label: 'Blok A2', status: 'reserved', x: 34, y: 18, width: 24, height: 20 },
      { id: 'm-b1', label: 'Blok B1', status: 'sold', x: 8, y: 42, width: 24, height: 20 },
      { id: 'm-b2', label: 'Blok B2', status: 'available', x: 34, y: 42, width: 24, height: 20 },
    ],
  },
  {
    id: 'stellar',
    slug: 'stellar',
    featured: true,
    badge: 'Commercial',
    image: '/assets/stellar_avenue.webp',
    imageAlt: 'Stellar Avenue Modern Retail Shophouses',
    title: 'Stellar Avenue Commercial',
    price: 'Mulai Rp 2.9 Miliar',
    excerpt:
      'Pusat gaya hidup dan bisnis kuliner berkonsep terbuka (alfresco) dengan aliran air dan taman hijau. Lokasi strategis dengan potensi kunjungan tinggi.',
    description: 'Stellar Avenue menghadirkan koridor komersial premium dengan konsep alfresco.',
    specs: [
      { icon: 'fa-solid fa-store', label: '3 Lantai' },
      { icon: 'fa-solid fa-square', label: 'Luas 180 m²' },
      { icon: 'fa-solid fa-circle-p', label: 'Area Parkir Luas' },
    ],
    hoverCta: {
      icon: 'fa-solid fa-file-invoice-dollar',
      label: 'Tanya Unit',
      href: '/#contact',
    },
    cta: {
      label: 'Minta Brosur Ruko',
      href: '/#contact',
    },
    sitePlanImage: '/assets/stellar_avenue.webp',
    sitePlanBlocks: [
      { id: 's-1', label: 'Unit 1-4', status: 'available', x: 10, y: 22, width: 35, height: 22 },
      { id: 's-2', label: 'Unit 5-8', status: 'reserved', x: 48, y: 22, width: 35, height: 22 },
    ],
  },
];

export const CLUSTER_OPTIONS = [
  { value: 'Marocco', label: 'Cluster Marocco Townhouse' },
  { value: 'Roma', label: 'Cluster Roma Residence' },
  { value: 'Stellar', label: 'Stellar Avenue Shophouse' },
  { value: 'Amsterdam', label: 'Shophouse Amsterdam' },
];
