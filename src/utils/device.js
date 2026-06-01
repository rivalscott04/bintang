/** Semua browser di iOS memakai WebKit (scroll root sering `body`). */
export function isIOSDevice() {
  if (typeof navigator === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export function supportsScrollSnap() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('scroll-snap-type', 'y proximity');
}
