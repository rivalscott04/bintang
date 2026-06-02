import { CLUSTERS } from '../data/clusters';
import { mediaUrl } from './assets';

export function normalizeCluster(cluster) {
  if (!cluster) return cluster;

  return {
    ...cluster,
    image: mediaUrl(cluster.image),
    sitePlanImage: mediaUrl(cluster.sitePlanImage),
  };
}

export function normalizeClusters(clusters) {
  return (Array.isArray(clusters) ? clusters : []).map(normalizeCluster);
}

export function getFeaturedClusters(clusters = CLUSTERS, limit = 2) {
  const list = Array.isArray(clusters) ? clusters : CLUSTERS;
  const featured = list.filter((c) => c.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return list.slice(0, limit);
}
