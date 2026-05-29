/** Inject a stylesheet once (below-the-fold / third-party CSS). */
export function loadStylesheet(href, { integrity, crossOrigin = 'anonymous' } = {}) {
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  if (integrity) {
    link.integrity = integrity;
    link.crossOrigin = crossOrigin;
  }
  document.head.appendChild(link);
}
