import { PROJECTS } from '../data/projects';
import { mediaUrl } from './assets';
import { inferClusterSlug } from './routes';

export function getProjectBySlug(slug) {
  if (!slug) return undefined;
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

/** Gabungkan data API dengan fallback statis agar field detail halaman tetap lengkap. */
export function mergeProjectWithLocal(apiProject) {
  if (!apiProject?.slug) {
    return apiProject;
  }

  const local = getProjectBySlug(apiProject.slug);
  if (!local) {
    return apiProject;
  }

  const rawImage = apiProject.image || local.image;
  const image = mediaUrl(rawImage);
  const rawGallery =
    apiProject.gallery?.length > 0
      ? apiProject.gallery
      : local.gallery?.length > 0
        ? local.gallery
        : rawImage
          ? [rawImage]
          : [];
  const gallery = rawGallery.map((item) => mediaUrl(item)).filter(Boolean);

  return {
    ...local,
    ...apiProject,
    image,
    gallery,
    priceRange: apiProject.priceRange ?? local.priceRange,
    specifications:
      apiProject.specifications && Object.keys(apiProject.specifications).length > 0
        ? apiProject.specifications
        : local.specifications,
    clusterSlug:
      apiProject.clusterSlug ?? local.clusterSlug ?? inferClusterSlug({ ...local, ...apiProject }),
    clusterAnchor: apiProject.clusterAnchor ?? local.clusterAnchor,
  };
}

export function getFeaturedProjects(projects = PROJECTS, limit = 3) {
  const list = Array.isArray(projects) ? projects : PROJECTS;
  const featured = list.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return list.slice(0, limit);
}
