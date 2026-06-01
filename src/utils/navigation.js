import { NAV_LINKS } from '../data/navigation';

/** Path menu yang sudah tidak dipakai di navbar global. */
const DEPRECATED_TO = new Set(['/#virtual-tour', '/#clusters', '/#amenities']);

function isDeprecatedNav(to) {
  if (!to) return true;
  if (DEPRECATED_TO.has(to)) return true;
  return to.includes('virtual-tour');
}

/** Menu kanonik: abaikan item API usang (mis. Tur Virtual di navbar). */
export function mergeNavigationLinks(apiLinks) {
  if (!Array.isArray(apiLinks) || apiLinks.length === 0) {
    return NAV_LINKS;
  }

  const apiByTo = new Map();
  for (const link of apiLinks) {
    const to = link.to ?? link.href;
    if (isDeprecatedNav(to)) {
      continue;
    }
    apiByTo.set(to, { ...link, to });
  }

  return NAV_LINKS.map((staticLink) => apiByTo.get(staticLink.to) ?? staticLink);
}
