import { API_BASE_URL } from '../api/config';

/** Origin situs (tanpa /api) untuk URL aset statis di backend/public/assets. */
export function assetOrigin() {
  if (!API_BASE_URL) return '';
  try {
    const url = new URL(API_BASE_URL);
    return url.origin;
  } catch {
    return '';
  }
}

/** URL publik aset statis (path `/assets/...` di Laravel public). */
export function assetUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const origin = assetOrigin();
  return origin ? `${origin}${normalized}` : normalized;
}

/** Varian responsive `-640` / `-828` dari URL `.webp` (path atau absolut). */
export function imageVariantUrl(url, width) {
  if (!url) return '';
  return url.replace(/\.webp$/i, `-${width}.webp`);
}
