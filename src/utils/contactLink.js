/** Apakah href mengarah ke section kontak beranda. */
export function isContactLinkHref(href) {
  if (!href) return false;
  const hash = href.startsWith('#') ? href : href.includes('#') ? href.slice(href.indexOf('#')) : '';
  return hash === '#contact';
}
