import { getJson } from './client';
import { hasApi } from './config';
import { getStaticTourForCluster } from '../utils/clusterTour';
import { buildStaticVirtualTour } from '../utils/virtualTour';

export async function fetchDefaultVirtualTour({ signal } = {}) {
  if (!hasApi) {
    return buildStaticVirtualTour();
  }

  const payload = await getJson('/virtual-tours/default', { signal });
  return payload;
}

export async function fetchVirtualTourByCluster(clusterSlug, { signal } = {}) {
  if (!hasApi) {
    return getStaticTourForCluster(clusterSlug);
  }

  try {
    return await getJson(`/virtual-tours/by-cluster/${clusterSlug}`, { signal });
  } catch (err) {
    if (err.status === 404) {
      return getStaticTourForCluster(clusterSlug);
    }
    throw err;
  }
}
