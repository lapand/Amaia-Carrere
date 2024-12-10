import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages: string[] = ['gallery', 'shop', 'about', 'contact'];

type LinkNavigationProps = {
  i: number;
  content: string;
  onClick: () => void;
};

const LinkNavigation: React.FC<LinkNavigationProps> = ({
  i,
  content,
  onClick,
}) => {
  const pathname = usePathname();
  const activeSection = pathname === '/' ? 'Home' : pathname.slice(1);

  return (
    <Link
      href={`/${pages[i]}`}
      onClick={onClick}
      className={`nav-link ${
        activeSection.toLowerCase() === pages[i] ? 'active' : ''
      }`}
      aria-label={`Go to ${pages[i]}`}
      tabIndex={0}
    >
      {content}
    </Link>
  );
};

export default LinkNavigation;
