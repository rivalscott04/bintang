import { NAV_LINKS } from '../data/navigation';
import { mergeNavigationLinks } from '../utils/navigation';
import { getJson } from './client';
import { hasApi } from './config';

/** Ambil menu navigasi dari API jika tersedia, else `src/data/navigation.js`. */
export async function fetchNavigation({ signal } = {}) {
  if (!hasApi) {
    return NAV_LINKS;
  }

  const payload = await getJson('/navigation', { signal });
  const raw = Array.isArray(payload) ? payload : payload.links ?? NAV_LINKS;
  return mergeNavigationLinks(raw);
}
