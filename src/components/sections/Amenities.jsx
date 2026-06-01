import { lazy, Suspense, useMemo, useState } from 'react';
import { AMENITY_CATEGORIES, CATEGORY_STYLE } from '../../data/amenities';
import { useAmenities } from '../../hooks/useAmenities';
import SectionHeader from '../ui/SectionHeader';

const AmenitiesMap = lazy(() =>
  import(/* webpackPrefetch: false */ /* webpackPreload: false */ './AmenitiesMap'),
);

export default function Amenities({ embedded = false }) {
  const { locations, error } = useAmenities();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLocation, setActiveLocation] = useState(null);

  const visibleLocations = useMemo(() => {
    const group = AMENITY_CATEGORIES.find((c) => c.id === activeCategory);
    if (!group?.categories) return locations;
    return locations.filter((l) => group.categories.includes(l.category));
  }, [activeCategory, locations]);

  const handleCategoryChange = (categoryId, label) => {
    setActiveCategory(categoryId);
    setActiveLocation({ kind: 'category', label });
  };

  const handleLocationClick = (loc) => {
    setActiveLocation({ kind: 'location', ...loc });
  };

  const Wrapper = embedded ? 'div' : 'section';

  return (
    <Wrapper id={embedded ? undefined : 'amenities'} className={embedded ? '' : 'py-24 bg-white'}>
      <div className="container-x">
        {error && (
          <p className="text-mute text-sm mb-6 text-center" role="status">
            Peta memakai data cadangan — periksa koneksi API.
          </p>
        )}

        <SectionHeader
          label="LOKASI STRATEGIS"
          title="Semua Ada di Sekitar Anda"
          description="Kuliner, hotel, bioskop, hingga sekolah ada di dalam kawasan Grand Kota Bintang, sekaligus terhubung langsung dengan Tol JORR, LRT Jabodebek, dan rumah sakit utama Bekasi Barat."
        />

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {AMENITY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id, cat.label)}
                aria-pressed={isActive}
                className={[
                  'flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full font-display font-semibold text-[0.85rem] cursor-pointer transition-all duration-400 ease-luxury border',
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'bg-surface text-ink border-primary/5 hover:bg-primary hover:text-white hover:border-primary',
                ].join(' ')}
              >
                <i className={cat.icon} /> {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[420px_1fr] max-lg:grid-cols-[340px_1fr] max-md:grid-cols-1 gap-8 h-[480px] max-md:h-auto">
          <div className="overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-luxury">
            <h3 className="sr-only">Daftar lokasi terdekat</h3>
            {visibleLocations.map((loc) => {
              const style = CATEGORY_STYLE[loc.category];
              const isActive =
                activeLocation?.kind === 'location' && activeLocation.name === loc.name;
              return (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => handleLocationClick(loc)}
                  aria-label={`${loc.name}, ${loc.time}`}
                  aria-pressed={isActive}
                  className={[
                    'group flex items-center gap-4 p-4 rounded-sm cursor-pointer transition-all duration-400 ease-luxury text-left w-full min-h-[48px]',
                    isActive
                      ? 'bg-white border border-secondary shadow-soft'
                      : 'bg-surface border border-primary/3 hover:bg-white hover:border-secondary hover:shadow-soft',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'w-10 h-10 rounded-sm flex items-center justify-center text-[1.1rem] transition-all duration-400 ease-luxury',
                      isActive
                        ? 'bg-secondary text-primary'
                        : 'bg-primary/4 text-primary',
                    ].join(' ')}
                  >
                    <i className={style.faIcon} />
                  </span>
                  <div>
                    <span className="block text-[0.95rem] mb-0.5 font-bold text-primary">{loc.name}</span>
                    <span className="text-[0.75rem] text-mute">{loc.time}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-medium border border-primary/8 flex flex-col max-md:h-[320px]">
            <Suspense
              fallback={
                <div
                  className="flex-1 min-h-[280px] bg-primary/5 animate-pulse"
                  aria-label="Memuat peta lokasi"
                />
              }
            >
              <AmenitiesMap
                locations={visibleLocations}
                flyTarget={activeLocation?.kind === 'location' ? activeLocation : null}
              />
            </Suspense>
            <MapInfoBar activeLocation={activeLocation} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

function MapInfoBar({ activeLocation }) {
  const baseClass =
    'bg-white border-t border-primary/6 px-5 py-3.5 text-[0.85rem] text-primary font-semibold font-display z-2';

  if (!activeLocation) {
    return (
      <div className={baseClass}>
        <i className="fa-solid fa-hand-pointer text-secondary-dark mr-1.5" /> Klik lokasi di daftar
        atau filter kategori di atas
      </div>
    );
  }

  if (activeLocation.kind === 'category') {
    return (
      <div className={baseClass}>
        <i className="fa-solid fa-filter text-secondary mr-1.5" /> Menampilkan:{' '}
        <strong>{activeLocation.label}</strong>. Klik lokasi di daftar untuk detail.
      </div>
    );
  }

  const style = CATEGORY_STYLE[activeLocation.category];
  return (
    <div className={baseClass}>
      <div className="flex flex-col gap-0.5 text-left">
        <strong className="font-display text-[0.9rem] text-primary flex items-center gap-2">
          <i className={`${style?.faIcon} text-secondary-dark`} /> {activeLocation.name}
        </strong>
        <span className="text-[0.78rem] text-secondary-dark font-semibold flex items-center gap-1.5">
          <i className="fa-solid fa-clock" /> {activeLocation.time}
        </span>
        <span className="text-[0.78rem] text-mute font-normal leading-relaxed">
          {activeLocation.desc}
        </span>
      </div>
    </div>
  );
}
