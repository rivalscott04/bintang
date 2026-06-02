import { useEffect } from 'react';
import { fetchClusters } from '../api/clusters';
import { fetchDefaultVirtualTour } from '../api/virtualTour';
import { hasApi } from '../api/config';
import { imageVariantUrl, mediaUrl } from '../utils/assets';
import { getFeaturedClusters } from '../utils/clusters';

function ensureHeroPicture(root) {
  let picture = root.querySelector('picture');
  if (picture) return picture;

  picture = document.createElement('picture');
  const mobile = document.createElement('source');
  mobile.media = '(max-width: 767px)';
  mobile.type = 'image/webp';
  const tablet = document.createElement('source');
  tablet.media = '(max-width: 1024px)';
  tablet.type = 'image/webp';
  const img = document.createElement('img');
  img.alt = '';
  img.width = 1024;
  img.height = 1024;
  img.fetchPriority = 'high';
  img.decoding = 'async';
  picture.append(mobile, tablet, img);
  root.append(picture);
  return picture;
}

function applyHeroBackground(src) {
  const root = document.getElementById('hero-lcp-bg');
  if (!root || !src) return;

  const picture = ensureHeroPicture(root);
  const img = picture.querySelector('img');
  const sources = picture.querySelectorAll('source');

  if (img) img.src = src;
  if (sources[0]) sources[0].srcset = imageVariantUrl(src, 640);
  if (sources[1]) sources[1].srcset = imageVariantUrl(src, 828);
}

/** Gambar hero hanya dari API backend (tur virtual default → klaster unggulan). */
export function useHeroBackground() {
  useEffect(() => {
    if (!hasApi) return;

    const controller = new AbortController();

    (async () => {
      try {
        const tour = await fetchDefaultVirtualTour({ signal: controller.signal });
        const fromTour = tour?.preview?.image;
        if (fromTour) {
          applyHeroBackground(mediaUrl(fromTour));
          return;
        }
      } catch {
        /* fallback klaster */
      }

      if (controller.signal.aborted) return;

      try {
        const clusters = await fetchClusters({ signal: controller.signal });
        const featured = getFeaturedClusters(clusters, 1)[0];
        if (featured?.image) {
          applyHeroBackground(featured.image);
        }
      } catch {
        /* gradient saja sampai API tersedia */
      }
    })();

    return () => controller.abort();
  }, []);
}
