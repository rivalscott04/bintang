import { useEffect, useState } from 'react';
import { fetchAmenityLocations } from '../api/amenities';
import { hasApi } from '../api/config';
import { AMENITY_LOCATIONS } from '../data/amenities';

export function useAmenities() {
  const [locations, setLocations] = useState(AMENITY_LOCATIONS);
  const [syncing, setSyncing] = useState(hasApi);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchAmenityLocations({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setLocations(data);
          setError(null);
        }
      } catch (err) {
        if (!controller.signal.aborted && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSyncing(false);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  return { locations, syncing, error };
}
