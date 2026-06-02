import { CLUSTERS } from '../data/clusters';
import { normalizeCluster, normalizeClusters } from '../utils/clusters';
import { ApiError, getJson } from './client';
import { hasApi } from './config';

export async function fetchClusters({ signal } = {}) {
  if (!hasApi) {
    return normalizeClusters(CLUSTERS);
  }

  const payload = await getJson('/clusters', { signal });
  const list = Array.isArray(payload) ? payload : payload.clusters ?? CLUSTERS;
  return normalizeClusters(list);
}

export async function fetchClusterBySlug(slug, { signal } = {}) {
  if (!hasApi) {
    const cluster = CLUSTERS.find((c) => c.id === slug || c.slug === slug);
    if (!cluster) {
      throw new ApiError('Klaster tidak ditemukan', { status: 404 });
    }
    return normalizeCluster(cluster);
  }

  const payload = await getJson(`/clusters/${encodeURIComponent(slug)}`, { signal });
  return normalizeCluster(payload.cluster ?? payload);
}
