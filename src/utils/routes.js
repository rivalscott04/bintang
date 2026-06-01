/** Canonical paths for klaster → proyek → tur navigation. */

export const LOCATION_PATH = '/lokasi';

export function clusterPath(clusterSlug) {
  if (!clusterSlug) return '/klaster';
  return `/klaster/${clusterSlug}`;
}

export function clusterTourPath(clusterSlug) {
  return `${clusterPath(clusterSlug)}?tour=1`;
}

export function clusterTourRoutePath(clusterSlug) {
  return `${clusterPath(clusterSlug)}/tur`;
}

export function projectPath(project) {
  if (!project?.slug) return '/projek';
  const clusterSlug = project.clusterSlug ?? inferClusterSlug(project);
  if (clusterSlug) {
    return `/klaster/${clusterSlug}/projek/${project.slug}`;
  }
  return `/projek/${project.slug}`;
}

/** Slug klaster dari field eksplisit atau slug proyek yang cocok dengan klaster. */
export function inferClusterSlug(project) {
  if (!project) return undefined;
  if (project.clusterSlug) return project.clusterSlug;
  const known = ['marocco', 'stellar', 'roma', 'amsterdam'];
  if (known.includes(project.slug)) return project.slug;
  const fromName = project.cluster?.toLowerCase?.().replace(/\s+/g, '-');
  if (fromName && known.includes(fromName)) return fromName;
  return undefined;
}

export function isLegacyProjectPath(pathname, clusterSlug) {
  return pathname.startsWith('/projek/') && !clusterSlug;
}
