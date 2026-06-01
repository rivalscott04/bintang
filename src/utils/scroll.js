/** Tinggi header tetap (px) — dipakai untuk offset scroll ke section. */
export const SCROLL_HEADER_OFFSET = 80;

/** Durasi tunggu layout stabil sebelum scroll ke hash (ms). */
export const SCROLL_HASH_DELAY_MS = 150;

export function getScrollHeaderOffset() {
  if (typeof document === 'undefined') return SCROLL_HEADER_OFFSET;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--home-header-offset');
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : SCROLL_HEADER_OFFSET;
}

export function scrollToElement(el, { behavior = 'smooth', offset = getScrollHeaderOffset() } = {}) {
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}
