import { Link } from 'react-router-dom';
import { isContactLinkHref } from '../../utils/contactLink';

/**
 * CTA ke formulir kontak. Di luar beranda, klik dibuka sebagai modal (interceptor global).
 */
export default function ContactCtaLink({
  to = '/#contact',
  href,
  cluster,
  project,
  className,
  children,
  onClick,
  ...rest
}) {
  const target = href ?? to;
  const shared = {
    className,
    'data-contact-cluster': cluster || undefined,
    'data-contact-project': project || undefined,
    onClick,
    ...rest,
  };

  if (typeof target === 'string' && target.startsWith('/') && !target.startsWith('http')) {
    return (
      <Link to={target} {...shared}>
        {children}
      </Link>
    );
  }

  return (
    <a href={target} {...shared}>
      {children}
    </a>
  );
}

export { isContactLinkHref };
