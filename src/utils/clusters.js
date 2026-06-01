import { CLUSTERS } from '../data/clusters';

export function getFeaturedClusters(clusters = CLUSTERS, limit = 2) {
  const list = Array.isArray(clusters) ? clusters : CLUSTERS;
  const featured = list.filter((c) => c.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return list.slice(0, limit);
}
