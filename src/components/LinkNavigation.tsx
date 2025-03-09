import { routes } from '@/config/config.global';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuTags: string[] = ['gallery', 'shop', 'about', 'contact'];

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
  const activeSection = (
    pathname === routes.home ? 'Home' : pathname.slice(1)
  ).toLowerCase();

  return (
    <Link
      href={`/${menuTags[i]}`}
      onClick={onClick}
      className={`cursor-pointer transition-colors duration-200 hover:text-amber-300 underline-custom after:transition-transform after:duration-200 after:bg-amber-300 after:scale-0 hover:after:scale-100 ${activeSection === menuTags[i] ? 'text-amber-300 after:scale-100' : ''}`}
      aria-label={`Go to ${menuTags[i]}`}
      tabIndex={0}
    >
      {content}
    </Link>
  );
};

export default LinkNavigation;
