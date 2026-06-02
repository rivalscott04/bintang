import { API_BASE_URL } from '../api/config';

const LOCAL_DEV_HOSTS = new Set(['localhost', '127.0.0.1']);

/** Origin Laravel (tanpa `/api`) — dipakai untuk `/assets` & `/storage`. */
export function apiOrigin() {
  const fallback =
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8000';

  if (!API_BASE_URL) {
    return fallback;
  }

  try {
    return new URL(API_BASE_URL, fallback).origin;
  } catch {
    return fallback;
  }
}

/** @deprecated gunakan apiOrigin */
export function assetOrigin() {
  return apiOrigin();
}

/**
 * URL publik media dari API atau data statis.
 * Path relatif (/assets, /storage) diarahkan ke origin backend agar gambar load di SPA terpisah.
 */
export function mediaUrl(path) {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const parsed = new URL(path);
      if (LOCAL_DEV_HOSTS.has(parsed.hostname)) {
        return `${apiOrigin()}${parsed.pathname}${parsed.search}`;
      }
    } catch {
      /* ignore */
    }
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${apiOrigin()}${normalized}`;
}

/** Varian responsive `-640` / `-828` hanya untuk file di `/assets/*.webp` di backend. */
export function imageVariantUrl(url, width) {
  const resolved = mediaUrl(url);
  if (!resolved || !resolved.includes('/assets/') || !/\.webp$/i.test(resolved)) {
    return resolved;
  }
  return resolved.replace(/\.webp$/i, `-${width}.webp`);
}
