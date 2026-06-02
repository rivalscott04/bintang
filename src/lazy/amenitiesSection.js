import { lazy } from 'react';

/** Satu dynamic import untuk HomePage + LocationPage (hindari duplikasi chunk di bundle utama). */
export const AmenitiesSection = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ '../components/sections/Amenities'),
);
