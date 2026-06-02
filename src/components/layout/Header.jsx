import { Link, useLocation } from 'react-router-dom';
import { useNavigation } from '../../hooks/useNavigation';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useContactSettings } from '../../hooks/useContactSettings';
import AppNavLink from './AppNavLink';

export default function Header() {
  const { whatsappUrl } = useContactSettings();
  const { links: navLinks } = useNavigation();
  const location = useLocation();
  const handleNavClick = useSmoothScroll();

  const onLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const hero = document.getElementById('hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '/');
      }
    }
  };

  const onContactClick = (e) => {
    if (location.pathname === '/') {
      handleNavClick(e);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-1000 bg-white/80 backdrop-blur-xl border-b border-primary/5 transition-all duration-400 ease-luxury">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link
            to="/"
            aria-label="Grand Kota Bintang - Beranda"
            onClick={onLogoClick}
            className="flex items-center gap-3 no-underline group"
          >
            <img
              src="/assets/logo.webp"
              alt="Grand Kota Bintang - Modern Integrated District"
              className="h-14 max-md:h-11 w-auto block transition-transform duration-400 ease-luxury group-hover:scale-[1.03]"
            />
          </Link>

          <nav aria-label="Navigasi utama" className="hidden md:block">
            <ul className="list-none flex items-center gap-9">
              {navLinks.map((link) => {
                const to = link.to ?? link.href;
                return (
                  <li key={to}>
                    <AppNavLink to={to} label={link.label} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat GM via WhatsApp"
            className="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#25D366] text-white text-xl shrink-0 shadow-[0_4px_12px_rgba(37,211,102,0.35)]"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden />
          </a>

          <div className="hidden md:block">
            <Link to="/#contact" className="btn-primary" onClick={onContactClick}>
              Dapatkan Penawaran <i className="fa-solid fa-chevron-right" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
