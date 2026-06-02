import { Link, useLocation } from 'react-router-dom';
import ContactCtaLink from '../contact/ContactCtaLink';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { isContactLinkHref } from '../../utils/contactLink';

/**
 * Nav item: route (`/projek`, `/klaster`) atau section beranda (`/#contact`).
 */
export default function AppNavLink({ to, label, onNavigate, variant = 'header' }) {
  const location = useLocation();
  const handleSmoothScroll = useSmoothScroll(onNavigate);

  const isHashLink = to.includes('#');
  const hash = isHashLink ? to.slice(to.indexOf('#')) : '';
  const isHome = location.pathname === '/';
  const isContact = isContactLinkHref(to);

  const isActive = isHashLink
    ? isHome && location.hash === hash
    : location.pathname === to || location.pathname.startsWith(`${to}/`);

  const handleClick = (e) => {
    if (isContact && isHome) {
      handleSmoothScroll(e);
    }
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
  };

  const headerClass = [
    'relative no-underline font-display font-semibold text-[0.95rem] py-2',
    'transition-colors duration-400 ease-luxury',
    'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-0.5',
    'after:bg-secondary after:transition-all after:duration-400 after:ease-luxury',
    'max-md:text-white/80 max-md:text-lg max-md:w-full max-md:block',
    isActive
      ? 'text-secondary after:w-full max-md:text-secondary'
      : 'text-ink after:w-0 hover:text-secondary hover:after:w-full',
  ].join(' ');

  const stickyClass = [
    'flex flex-col items-center justify-center gap-1 no-underline text-[0.65rem] font-medium',
    'flex-1 min-h-[48px] min-w-[48px] px-1 py-2 transition-colors duration-400 ease-luxury',
    isActive ? 'text-secondary' : 'text-white/60 hover:text-secondary focus:text-secondary',
  ].join(' ');

  const className = variant === 'sticky' ? stickyClass : headerClass;

  if (isContact) {
    return (
      <ContactCtaLink
        to={to}
        onClick={handleClick}
        className={className}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
      </ContactCtaLink>
    );
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={className}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
