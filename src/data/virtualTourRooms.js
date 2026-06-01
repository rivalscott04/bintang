/**
 * Virtual Tour 3D: Room Layout & Camera Waypoints
 *
 * Konsep: 4 ruangan dalam layout 2x2 grid (denah unit premium 2BR).
 * Koordinat dalam unit Three.js (1 unit ≈ 1 meter).
 *
 *           z=+8 ┌──────────────┬──────────────┐
 *                │   BEDROOM    │   BATHROOM   │
 *                │  (-10..0)    │   (0..10)    │
 *            z=0 ├──────────────┼──────────────┤
 *                │ LIVING ROOM  │   KITCHEN    │
 *                │  (-10..0)    │   (0..10)    │
 *           z=-8 └──────────────┴──────────────┘
 *               x=-10         x=0           x=10
 *
 * Catatan: Tinggi mata kamera = 1.7m (orang dewasa).
 *          Floor color & wall color mengikuti palette brand (champagne gold + ivory).
 */

export const ROOM_HEIGHT = 3.2;
export const EYE_HEIGHT = 1.7;

export const ROOMS = [
  {
    id: 'living-room',
    name: 'Ruang Tamu',
    icon: 'fa-couch',
    description: 'Ruang berkumpul lapang dengan sofa modular L-shape, smart TV 65", dan jendela besar menghadap taman.',
    specs: { area: '28 m²', highlight: 'Bay Window 3.6m' },
    bounds: { x: [-10, 0], z: [-8, 0] },
    floorColor: '#b89876',
    wallColor: '#f5ede0',
    accentColor: '#0a1931',
    // Camera di pojok timur-laut ruangan, melihat ke arah pusat (sofa & TV).
    // Target diletakkan tepat di pusat ruangan agar orbit user tidak keluar dinding.
    cameraView: {
      position: [-3.5, 1.7, -2.5],
      target: [-5, 1.6, -4],
    },
    furniture: [
      // Jendela besar di dinding selatan (eksterior): biar terang & bukan tembok kosong
      { type: 'box', position: [-5, 1.7, -7.93], size: [3.6, 1.8, 0.04], color: '#a8c8e0', emissive: '#c8def0', emissiveIntensity: 0.4 },
      { type: 'box', position: [-5, 0.75, -7.93], size: [3.8, 0.1, 0.05], color: '#c5a880' }, // kusen bawah
      { type: 'box', position: [-5, 2.65, -7.93], size: [3.8, 0.1, 0.05], color: '#c5a880' }, // kusen atas
      // Wall art di dinding barat (samping sofa)
      { type: 'box', position: [-9.93, 1.7, -5], size: [0.04, 1.2, 0.9], color: '#2a3a52' },
      { type: 'box', position: [-9.93, 1.7, -3.5], size: [0.04, 0.8, 0.6], color: '#7a6249' },
      // Sofa L-shape (2 segmen)
      { type: 'box', position: [-7.5, 0.45, -1.5], size: [4, 0.9, 1.2], color: '#2a3a52' },
      { type: 'box', position: [-9.2, 0.45, -3.5], size: [0.8, 0.9, 3.2], color: '#2a3a52' },
      // Cushion atas sofa
      { type: 'box', position: [-7.5, 1.0, -1.2], size: [3.8, 0.3, 0.8], color: '#3d5071' },
      // Coffee table
      { type: 'box', position: [-7, 0.25, -3.5], size: [2.2, 0.5, 1.2], color: '#c5a880' },
      // TV stand
      { type: 'box', position: [-4, 0.3, -7.5], size: [3, 0.6, 0.5], color: '#1c2434' },
      // TV (thin black panel)
      { type: 'box', position: [-4, 1.4, -7.85], size: [2.4, 1.4, 0.08], color: '#0a0a0a' },
      // Karpet
      { type: 'box', position: [-6.5, 0.02, -3], size: [4.5, 0.04, 3.5], color: '#7a6249' },
      // Lampu lantai (cone + sphere)
      { type: 'cylinder', position: [-2.5, 0.6, -2], size: [0.05, 0.05, 1.2], color: '#3d2f1c' },
      { type: 'sphere', position: [-2.5, 1.4, -2], radius: 0.25, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.4 },
      // Tanaman (cone)
      { type: 'cylinder', position: [-1, 0.3, -7], size: [0.35, 0.35, 0.6], color: '#3a2818' },
      { type: 'cone', position: [-1, 1.1, -7], radius: 0.6, height: 1.4, color: '#3d6b2f' },
    ],
  },
  {
    id: 'kitchen',
    name: 'Dapur',
    icon: 'fa-utensils',
    description: 'Dapur modular dengan island countertop marmer, kompor induksi 4 tungku, dan kabinet built-in floor-to-ceiling.',
    specs: { area: '20 m²', highlight: 'Marble Island 2.4m' },
    bounds: { x: [0, 10], z: [-8, 0] },
    floorColor: '#d4c8b8',
    wallColor: '#fafafa',
    accentColor: '#c5a880',
    cameraView: {
      position: [6.5, 1.7, -2.5],
      target: [5, 1.6, -4],
    },
    furniture: [
      // Jendela di dinding timur (eksterior): natural light
      { type: 'box', position: [9.93, 1.7, -5], size: [0.04, 1.6, 2.4], color: '#a8c8e0', emissive: '#c8def0', emissiveIntensity: 0.4 },
      { type: 'box', position: [9.93, 0.85, -5], size: [0.05, 0.1, 2.6], color: '#c5a880' },
      { type: 'box', position: [9.93, 2.55, -5], size: [0.05, 0.1, 2.6], color: '#c5a880' },
      // Wall art di dinding utara (di atas counter island)
      { type: 'box', position: [5, 1.9, -0.07], size: [1.4, 0.9, 0.04], color: '#0a1931' },
      // Counter L-shape (panjang di sisi z=-7.5)
      { type: 'box', position: [5, 0.45, -7.3], size: [9.5, 0.9, 0.8], color: '#e8e0d2' },
      // Backsplash + cabinet atas
      { type: 'box', position: [5, 2.2, -7.85], size: [9.5, 1.4, 0.4], color: '#1c2434' },
      // Kompor (square panel di counter)
      { type: 'box', position: [3, 0.91, -7.3], size: [1, 0.05, 0.7], color: '#0a0a0a' },
      // Sink
      { type: 'box', position: [6, 0.91, -7.3], size: [1, 0.05, 0.6], color: '#a3a3a3' },
      // Kulkas tinggi
      { type: 'box', position: [9.2, 1.1, -7.4], size: [0.8, 2.2, 0.7], color: '#dadada' },
      // Island countertop
      { type: 'box', position: [5, 0.45, -3], size: [3, 0.9, 1.2], color: '#ffffff' },
      { type: 'box', position: [5, 0.92, -3], size: [3.1, 0.05, 1.3], color: '#e8e0d2' },
      // Bar stools (3 buah)
      { type: 'cylinder', position: [3.8, 0.4, -2.2], size: [0.2, 0.25, 0.8], color: '#c5a880' },
      { type: 'cylinder', position: [5, 0.4, -2.2], size: [0.2, 0.25, 0.8], color: '#c5a880' },
      { type: 'cylinder', position: [6.2, 0.4, -2.2], size: [0.2, 0.25, 0.8], color: '#c5a880' },
      // Pendant lights di atas island (3 buah)
      { type: 'sphere', position: [3.8, 2.6, -3], radius: 0.18, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.5 },
      { type: 'sphere', position: [5, 2.6, -3], radius: 0.18, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.5 },
      { type: 'sphere', position: [6.2, 2.6, -3], radius: 0.18, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.5 },
    ],
  },
  {
    id: 'bedroom',
    name: 'Kamar Tidur Utama',
    icon: 'fa-bed',
    description: 'Master bedroom dengan king-size bed, walk-in closet, dan jendela floor-to-ceiling menghadap timur.',
    specs: { area: '24 m²', highlight: 'King Size Bed 200x200' },
    bounds: { x: [-10, 0], z: [0, 8] },
    floorColor: '#a88c6a',
    wallColor: '#e8dfd0',
    accentColor: '#c5a880',
    cameraView: {
      position: [-6.5, 1.7, 5.5],
      target: [-5, 1.6, 4],
    },
    furniture: [
      // Jendela floor-to-ceiling di dinding utara (eksterior): view timur
      { type: 'box', position: [-3, 1.5, 7.93], size: [2.6, 2.4, 0.04], color: '#a8c8e0', emissive: '#c8def0', emissiveIntensity: 0.45 },
      { type: 'box', position: [-3, 0.35, 7.93], size: [2.8, 0.08, 0.05], color: '#3d2f1c' },
      { type: 'box', position: [-3, 2.75, 7.93], size: [2.8, 0.08, 0.05], color: '#3d2f1c' },
      // Wall art besar di dinding timur (di samping pintu)
      { type: 'box', position: [-0.07, 1.8, 6], size: [0.04, 1.4, 1], color: '#5c4a36' },
      // King size bed: base
      { type: 'box', position: [-3, 0.3, 4], size: [3, 0.6, 4], color: '#5c4a36' },
      // Mattress
      { type: 'box', position: [-3, 0.75, 4], size: [2.8, 0.3, 3.8], color: '#fafafa' },
      // Pillow x2
      { type: 'box', position: [-3.8, 0.95, 3], size: [1.1, 0.15, 0.7], color: '#f5ede0' },
      { type: 'box', position: [-2.2, 0.95, 3], size: [1.1, 0.15, 0.7], color: '#f5ede0' },
      // Selimut/duvet (sedikit lebih tebal di kaki)
      { type: 'box', position: [-3, 0.92, 5], size: [2.8, 0.12, 1.8], color: '#2a3a52' },
      // Headboard
      { type: 'box', position: [-3, 1.3, 2.15], size: [3.2, 1.8, 0.2], color: '#3d2f1c' },
      // Nightstand x2
      { type: 'box', position: [-5, 0.3, 2.5], size: [0.8, 0.6, 0.8], color: '#3d2f1c' },
      { type: 'box', position: [-1, 0.3, 2.5], size: [0.8, 0.6, 0.8], color: '#3d2f1c' },
      // Lampu meja x2
      { type: 'sphere', position: [-5, 0.85, 2.5], radius: 0.2, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.6 },
      { type: 'sphere', position: [-1, 0.85, 2.5], radius: 0.2, color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.6 },
      // Wardrobe (lemari tinggi sepanjang dinding kiri)
      { type: 'box', position: [-9.6, 1.4, 4], size: [0.6, 2.8, 5], color: '#3d2f1c' },
      // Karpet
      { type: 'box', position: [-3, 0.02, 5.5], size: [3.5, 0.04, 2], color: '#7a6249' },
      // Tanaman pojok
      { type: 'cylinder', position: [-9, 0.3, 7.2], size: [0.3, 0.3, 0.6], color: '#3a2818' },
      { type: 'cone', position: [-9, 1.0, 7.2], radius: 0.5, height: 1.2, color: '#3d6b2f' },
    ],
  },
  {
    id: 'bathroom',
    name: 'Kamar Mandi',
    icon: 'fa-bath',
    description: 'Kamar mandi premium dengan bathtub freestanding, walk-in shower kaca, dan ventilasi alami.',
    specs: { area: '12 m²', highlight: 'Freestanding Bathtub' },
    bounds: { x: [0, 10], z: [0, 8] },
    floorColor: '#d8d4cc',
    wallColor: '#ffffff',
    accentColor: '#c5a880',
    cameraView: {
      position: [6.5, 1.7, 2.5],
      target: [5, 1.5, 4],
    },
    furniture: [
      // Jendela ventilasi di dinding utara (atas bathtub): bukaan tinggi untuk privacy
      { type: 'box', position: [3, 2.3, 7.93], size: [2, 0.8, 0.04], color: '#a8c8e0', emissive: '#c8def0', emissiveIntensity: 0.5 },
      { type: 'box', position: [3, 1.85, 7.93], size: [2.2, 0.08, 0.05], color: '#c5a880' },
      { type: 'box', position: [3, 2.75, 7.93], size: [2.2, 0.08, 0.05], color: '#c5a880' },
      // Wall art di dinding barat
      { type: 'box', position: [0.07, 1.7, 4.5], size: [0.04, 1, 0.7], color: '#2a3a52' },
      // Bathtub (freestanding): base oval pakai cylinder
      { type: 'cylinder', position: [3, 0.35, 5], size: [0.9, 0.9, 0.7], color: '#ffffff' },
      { type: 'box', position: [3, 0.35, 5], size: [2.4, 0.7, 1.4], color: '#ffffff' },
      // Inner basin (lebih gelap biar terlihat berongga)
      { type: 'box', position: [3, 0.55, 5], size: [2.2, 0.35, 1.2], color: '#e8e0d2' },
      // Toilet
      { type: 'box', position: [8.5, 0.35, 3], size: [0.6, 0.7, 0.7], color: '#fafafa' },
      { type: 'box', position: [8.5, 0.85, 2.7], size: [0.5, 0.3, 0.15], color: '#fafafa' },
      // Sink + vanity
      { type: 'box', position: [8, 0.45, 7], size: [2, 0.9, 0.6], color: '#3d2f1c' },
      { type: 'box', position: [8, 0.92, 7], size: [2, 0.05, 0.6], color: '#e8e0d2' },
      // Cermin (panel tipis di dinding)
      { type: 'box', position: [8, 1.9, 7.7], size: [1.6, 1.2, 0.05], color: '#a8d0e6' },
      // Shower area glass (panel transparan)
      { type: 'box', position: [5.5, 1.2, 7.5], size: [0.05, 2.4, 1.6], color: '#a8d0e6', transparent: true, opacity: 0.3 },
      { type: 'box', position: [6.3, 1.2, 6.7], size: [1.5, 2.4, 0.05], color: '#a8d0e6', transparent: true, opacity: 0.3 },
      // Lampu cermin (strip)
      { type: 'box', position: [8, 2.8, 7.6], size: [1.4, 0.1, 0.1], color: '#fff4d6', emissive: '#ffd28a', emissiveIntensity: 0.6 },
    ],
  },
];

/**
 * Hotspot connections: antar ruangan via pintu/lorong.
 * Posisi hotspot di dunia 3D, klik = pindah ke kamera view ruangan target.
 */
export const HOTSPOTS = [
  { from: 'living-room', to: 'kitchen', position: [-0.5, 1.5, -4], label: 'ke Dapur' },
  { from: 'kitchen', to: 'living-room', position: [0.5, 1.5, -4], label: 'ke Ruang Tamu' },
  { from: 'living-room', to: 'bedroom', position: [-5, 1.5, -0.5], label: 'ke Kamar Tidur' },
  { from: 'bedroom', to: 'living-room', position: [-5, 1.5, 0.5], label: 'ke Ruang Tamu' },
  { from: 'kitchen', to: 'bathroom', position: [5, 1.5, -0.5], label: 'ke Kamar Mandi' },
  { from: 'bathroom', to: 'kitchen', position: [5, 1.5, 0.5], label: 'ke Dapur' },
  { from: 'bedroom', to: 'bathroom', position: [-0.5, 1.5, 4], label: 'ke Kamar Mandi' },
  { from: 'bathroom', to: 'bedroom', position: [0.5, 1.5, 4], label: 'ke Kamar Tidur' },
];

/**
 * Cinematic auto-tour: urutan kamera (waypoints) buat mode "Tur Sinematik".
 * Setiap waypoint: [position, target, duration_seconds (durasi transisi dari waypoint sebelumnya), hold_seconds].
 */
export const CINEMATIC_WAYPOINTS = [
  // Mulai di tengah entrance, pan ke ruang tamu
  { position: [-5, 2.2, -7.5], target: [-5, 1.5, 0], duration: 0, hold: 1.5, roomId: null },
  { position: [-7.5, 1.7, -6], target: [-3, 1.4, -2], duration: 3.5, hold: 2.5, roomId: 'living-room' },
  // Slide ke dapur
  { position: [-2, 1.8, -4], target: [3, 1.5, -5], duration: 3, hold: 0.5, roomId: null },
  { position: [7, 1.7, -1.5], target: [3, 1.4, -5], duration: 3, hold: 2.5, roomId: 'kitchen' },
  // Naik ke kamar mandi
  { position: [6, 1.8, 2], target: [7, 1.3, 5], duration: 3, hold: 0.5, roomId: null },
  { position: [7, 1.7, 6.5], target: [3, 1.0, 3], duration: 3, hold: 2.5, roomId: 'bathroom' },
  // Geser ke kamar tidur
  { position: [-1, 1.8, 4], target: [-5, 1.4, 5], duration: 3.5, hold: 0.5, roomId: null },
  { position: [-7.5, 1.7, 6.5], target: [-3, 1.2, 3], duration: 3, hold: 2.5, roomId: 'bedroom' },
  // Final overview dari atas
  { position: [0, 14, -14], target: [0, 0, 0], duration: 4, hold: 2, roomId: null },
];
