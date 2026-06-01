import { CLUSTERS } from '../data/clusters';
import { ApiError, getJson } from './client';
import { hasApi } from './config';

export async function fetchClusters({ signal } = {}) {
  if (!hasApi) {
    return CLUSTERS;
  }

  const payload = await getJson('/clusters', { signal });
  return Array.isArray(payload) ? payload : payload.clusters ?? CLUSTERS;
}

export async function fetchClusterBySlug(slug, { signal } = {}) {
  if (!hasApi) {
    const cluster = CLUSTERS.find((c) => c.id === slug || c.slug === slug);
    if (!cluster) {
      throw new ApiError('Klaster tidak ditemukan', { status: 404 });
    }
    return cluster;
  }

  const payload = await getJson(`/clusters/${encodeURIComponent(slug)}`, { signal });
  return payload.cluster ?? payload;
}
