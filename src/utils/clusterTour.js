import { buildStaticVirtualTour } from './virtualTour';

/** Tur statis per klaster (fallback tanpa API). */
const STATIC_TOURS_BY_CLUSTER = {
  marocco: buildStaticVirtualTour,
};

export function getStaticTourForCluster(clusterSlug) {
  if (!clusterSlug) return null;
  const factory = STATIC_TOURS_BY_CLUSTER[clusterSlug];
  return factory ? factory() : null;
}

export function clusterHasTour(clusterSlug) {
  return Boolean(getStaticTourForCluster(clusterSlug));
}
