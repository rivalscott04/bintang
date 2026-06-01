import { Link, useLocation } from 'react-router-dom';
import { STICKY_NAV_ITEMS } from '../../data/stickyNav';
import { useContactSettings } from '../../hooks/useContactSettings';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function StickyMobileNav() {
  const { whatsappUrl } = useContactSettings();
  const location = useLocation();
  const handleScroll = useSmoothScroll();

  return (
    <nav
      aria-label="Navigasi mobile cepat"
      className="flex md:hidden fixed bottom-0 left-0 w-full bg-primary backdrop-blur-md border-t border-white/10 z-998 justify-around items-stretch"
      style={{
        height: 'calc(72px + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {STICKY_NAV_ITEMS.map((item) => {
        const baseClass =
          'flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium flex-1 min-h-[48px] min-w-[48px] px-1 py-2 transition-colors duration-400 ease-luxury';

        if (item.external) {
          const href = item.id === 'wa' ? whatsappUrl : item.href;
          return (
            <a
              key={item.id}
              href={href}
              aria-label={item.label}
              target="_blank"
              rel="noreferrer"
              className={`${baseClass} text-[#25D366]`}
            >
              <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#25D366]/10 border border-[#25D366]/20 shadow-[0_4px_10px_rgba(37,211,102,0.15)] -mt-3 transition-all duration-400 ease-luxury">
                <i className={`${item.icon} text-[1.3rem]`} />
              </span>
              <span>{item.label}</span>
            </a>
          );
        }

        const to = item.to ?? item.href;
        const isHashLink = to.includes('#');
        const hash = isHashLink ? to.slice(to.indexOf('#')) : '';
        const isHome = location.pathname === '/';
        const isActive = isHashLink
          ? isHome && location.hash === hash
          : location.pathname === to || location.pathname.startsWith(`${to}/`);

        const colorClass = isActive
          ? 'text-secondary'
          : 'text-white/60 hover:text-secondary focus:text-secondary';

        return (
          <Link
            key={item.id}
            to={to}
            aria-label={item.label}
            onClick={isHashLink && isHome ? handleScroll : undefined}
            className={`${baseClass} ${colorClass}`}
          >
            <i className={`${item.icon} text-[1.15rem]`} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
