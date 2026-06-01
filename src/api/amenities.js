import { AMENITY_LOCATIONS } from '../data/amenities';
import { getJson } from './client';
import { hasApi } from './config';

/** Daftar pin lokasi amenitas dari API, fallback ke data statis. */
export async function fetchAmenityLocations({ signal } = {}) {
  if (!hasApi) {
    return AMENITY_LOCATIONS;
  }

  const payload = await getJson('/amenities', { signal });
  const list = Array.isArray(payload) ? payload : payload.locations ?? AMENITY_LOCATIONS;

  return list.length > 0 ? list : AMENITY_LOCATIONS;
}
