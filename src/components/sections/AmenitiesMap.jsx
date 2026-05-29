import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CATEGORY_STYLE } from '../../data/amenities';
import { GKB_CENTER } from '../../utils/constants';

/* Leaflet divIcon styles are kept inline because they're rendered into the
   leaflet DOM as raw HTML strings (Tailwind classes can't be reliably purged
   for that path, and these visuals are very contextual). */

function makeAmenityIcon(category) {
  const color = CATEGORY_STYLE[category];
  return L.divIcon({
    html: `<div style="
        background-color: ${color.bg};
        color: #fff;
        width: 34px; height: 34px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px;
        border: 3px solid ${color.border};
        box-shadow: 0 3px 12px rgba(0,0,0,0.25);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      "><i class="${color.faIcon}"></i></div>`,
    className: 'amenity-marker-icon',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20],
  });
}

const gkbIcon = L.divIcon({
  html: `<div style="
      background: linear-gradient(135deg, #0A1931, #15305B);
      color: #C5A880;
      width: 44px; height: 44px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      border: 3px solid #C5A880;
      box-shadow: 0 4px 16px rgba(10,25,49,0.4), 0 0 0 6px rgba(197,168,128,0.2);
      animation: pulseGlow 2s infinite;
    "><i class="fa-solid fa-star"></i></div>`,
  className: 'gkb-center-marker',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  popupAnchor: [0, -26],
});

/** Imperatively flies the map to a target and opens its popup. */
function MapController({ flyTarget, fitBounds, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!flyTarget) return;
    map.flyTo([flyTarget.lat, flyTarget.lng], 16, { duration: 1.0, easeLinearity: 0.25 });
    const timer = setTimeout(() => {
      const marker = markerRefs.current[flyTarget.name];
      if (marker) marker.openPopup();
    }, 600);
    return () => clearTimeout(timer);
  }, [flyTarget, map, markerRefs]);

  useEffect(() => {
    if (!fitBounds || fitBounds.length < 2) return;
    map.flyToBounds(L.latLngBounds(fitBounds).pad(0.15), { duration: 0.8 });
  }, [fitBounds, map]);

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

export default function AmenitiesMap({ locations, flyTarget }) {
  const markerRefs = useRef({});

  const fitBounds = useMemo(
    () => [GKB_CENTER, ...locations.map((l) => [l.lat, l.lng])],
    [locations],
  );

  return (
    <MapContainer
      center={GKB_CENTER}
      zoom={14}
      scrollWheelZoom
      className="w-full h-full min-h-[420px] max-md:min-h-[260px] z-1"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />

      <Marker position={GKB_CENTER} icon={gkbIcon} zIndexOffset={1000}>
        <Popup>
          <div className="p-3.5">
            <div className="font-extrabold text-[0.9rem] text-primary mb-1 flex items-center gap-2">
              <i className="fa-solid fa-star text-secondary" /> Grand Kota Bintang
            </div>
            <div className="text-[0.75rem] text-mute font-normal leading-relaxed">
              Superblock terintegrasi premium seluas 72 Ha di Bekasi Barat. Pusat hunian eksklusif &amp;
              ruko komersial modern.
            </div>
          </div>
        </Popup>
      </Marker>

      {locations.map((loc) => {
        const style = CATEGORY_STYLE[loc.category];
        return (
          <Marker
            key={loc.name}
            position={[loc.lat, loc.lng]}
            icon={makeAmenityIcon(loc.category)}
            ref={(ref) => {
              if (ref) markerRefs.current[loc.name] = ref;
            }}
          >
            <Popup>
              <div className="p-3.5">
                <div className="font-extrabold text-[0.9rem] text-primary mb-1 flex items-center gap-2">
                  <i className={`${style.faIcon} text-secondary-dark`} /> {loc.name}
                </div>
                <div className="text-[0.78rem] font-semibold text-secondary-dark mb-1.5">
                  <i className="fa-solid fa-clock" /> {loc.time}
                </div>
                <div className="text-[0.75rem] text-mute font-normal leading-relaxed">
                  {loc.desc}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {locations.map((loc) => (
        <Polyline
          key={`route-${loc.name}`}
          positions={[GKB_CENTER, [loc.lat, loc.lng]]}
          pathOptions={{
            color: CATEGORY_STYLE[loc.category].bg,
            weight: 2,
            opacity: 0.35,
            dashArray: '8, 6',
          }}
        />
      ))}

      <MapController flyTarget={flyTarget} fitBounds={fitBounds} markerRefs={markerRefs} />
    </MapContainer>
  );
}
