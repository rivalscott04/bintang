import {
  CINEMATIC_WAYPOINTS,
  EYE_HEIGHT,
  HOTSPOTS,
  ROOM_HEIGHT,
  ROOMS,
} from '../data/virtualTourRooms';

/** Bangun konfigurasi 3D dari payload API atau data statis. */
export function buildTourSceneConfig(tour) {
  if (!tour?.rooms?.length) {
    return buildStaticTourConfig();
  }

  const roomOpenings = {};
  for (const room of tour.rooms) {
    roomOpenings[room.id] = room.doorOpenings ?? [];
  }

  return {
    roomHeight: tour.roomHeight ?? ROOM_HEIGHT,
    eyeHeight: tour.eyeHeight ?? EYE_HEIGHT,
    rooms: tour.rooms,
    hotspots: tour.hotspots ?? [],
    cinematicWaypoints: tour.cinematicWaypoints ?? [],
    roomOpenings,
  };
}

export function buildStaticTourConfig() {
  const roomOpenings = {
    'living-room': [
      { side: 'north', center: -5 },
      { side: 'east', center: -4 },
    ],
    kitchen: [
      { side: 'west', center: -4 },
      { side: 'north', center: 5 },
    ],
    bedroom: [
      { side: 'south', center: -5 },
      { side: 'east', center: 4 },
    ],
    bathroom: [
      { side: 'south', center: 5 },
      { side: 'west', center: 4 },
    ],
  };

  return {
    roomHeight: ROOM_HEIGHT,
    eyeHeight: EYE_HEIGHT,
    rooms: ROOMS,
    hotspots: HOTSPOTS,
    cinematicWaypoints: CINEMATIC_WAYPOINTS,
    roomOpenings,
  };
}

/** Metadata section beranda (bukan scene 3D). */
export function buildStaticVirtualTour() {
  return {
    slug: 'marocco-default',
    ...buildStaticTourMeta(),
    roomHeight: ROOM_HEIGHT,
    eyeHeight: EYE_HEIGHT,
    rooms: ROOMS,
    hotspots: HOTSPOTS,
    cinematicWaypoints: CINEMATIC_WAYPOINTS,
  };
}

export function buildStaticTourMeta() {
  return {
    section: {
      label: 'TUR VIRTUAL',
      title: 'Tur Virtual 3D',
      description: '',
    },
    preview: {
      image: '/assets/cluster_marocco-828.webp', // path relatif; API mengembalikan URL penuh bila dari backend
      imageAlt: 'Preview tur virtual Cluster Marocco',
    },
    card: {
      headline: 'Cluster Marocco',
      headlineAccent: '',
      description: '',
      buttonLabel: 'Tur 3D',
    },
    modal: {
      subtitle: 'Cluster Marocco',
    },
  };
}

export function getTourMeta(tour) {
  if (!tour?.section) {
    return buildStaticTourMeta();
  }

  return {
    section: tour.section,
    preview: tour.preview,
    card: tour.card,
    modal: tour.modal,
  };
}
