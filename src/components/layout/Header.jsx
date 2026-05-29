import { useState } from 'react';
import { NAV_LINKS } from '../../data/navigation';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

export default function Header() {
  const { isOpen, close, toggle } = useMobileMenu();
  const [activeHref, setActiveHref] = useState('#hero');
  const handleNavClick = useSmoothScroll(close);

  const onLinkClick = (href) => (e) => {
    setActiveHref(href);
    handleNavClick(e);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-1000 bg-white/80 backdrop-blur-xl border-b border-primary/5 transition-all duration-400 ease-luxury">
      <div className="max-w-[1240px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left-Aligned Group: Logo and Nav links */}
        <div className="flex items-center gap-16">
          <a
            href="#hero"
            aria-label="Grand Kota Bintang - Beranda"
            onClick={onLinkClick('#hero')}
            className="flex items-center gap-3 no-underline group"
          >
            <img
              src="/assets/logo.webp"
              alt="Grand Kota Bintang - Modern Integrated District"
              className="h-14 max-md:h-11 w-auto block transition-transform duration-400 ease-luxury group-hover:scale-[1.03]"
            />
          </a>

          <nav
            className={[
              'max-md:fixed max-md:top-0 max-md:h-screen max-md:w-4/5 max-md:max-w-xs',
              'max-md:bg-primary max-md:z-1000 max-md:pt-[100px] max-md:px-10 max-md:pb-10',
              'max-md:shadow-[-10px_0_40px_rgba(0,0,0,0.2)]',
              'max-md:flex max-md:flex-col max-md:gap-10',
              'max-md:transition-[right] max-md:duration-400 max-md:ease-luxury',
              isOpen ? 'max-md:right-0' : 'max-md:-right-full',
            ].join(' ')}
          >
            <ul className="list-none flex items-center gap-9 max-md:flex-col max-md:items-start max-md:gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href} className="max-md:w-full">
                    <a
                      href={link.href}
                      onClick={onLinkClick(link.href)}
                      className={[
                        'relative no-underline font-display font-semibold text-[0.95rem] py-2',
                        'transition-colors duration-400 ease-luxury',
                        'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-0.5',
                        'after:bg-secondary after:transition-all after:duration-400 after:ease-luxury',
                        'max-md:text-white/80 max-md:text-lg max-md:w-full max-md:block',
                        isActive
                          ? 'text-secondary after:w-full max-md:text-secondary'
                          : 'text-ink after:w-0 hover:text-secondary hover:after:w-full',
                      ].join(' ')}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="hidden max-md:block max-md:mt-auto max-md:w-full">
              <a href="#contact" className="btn-primary w-full justify-center" onClick={onLinkClick('#contact')}>
                Dapatkan Penawaran <i className="fa-solid fa-chevron-right" />
              </a>
            </div>
          </nav>
        </div>

        <button
          type="button"
          aria-label="Buka Menu Navigasi"
          aria-expanded={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          className="hidden"
        >
          <span
            className={[
              'block w-full h-0.5 rounded-sm transition-all duration-400 ease-luxury',
              isOpen ? 'bg-white translate-y-[6px] rotate-45' : 'bg-primary',
            ].join(' ')}
          />
          <span
            className={[
              'block w-full h-0.5 rounded-sm transition-all duration-400 ease-luxury',
              isOpen ? 'opacity-0' : 'bg-primary',
            ].join(' ')}
          />
          <span
            className={[
              'block w-full h-0.5 rounded-sm transition-all duration-400 ease-luxury',
              isOpen ? 'bg-white translate-y-[-6px] -rotate-45' : 'bg-primary',
            ].join(' ')}
          />
        </button>

        <div className="hidden md:block">
          <a href="#contact" className="btn-primary" onClick={onLinkClick('#contact')}>
            Dapatkan Penawaran <i className="fa-solid fa-chevron-right" />
          </a>
        </div>
      </div>
    </header>
  );
}
