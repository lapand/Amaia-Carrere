import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import { ArticleCardType } from '@/app/types';

const ArticleCard: React.FC<ArticleCardType> = ({
  id,
  img,
  title,
  description,
  price,
}) => {
  // Formatage du titre de l'article afin qu'il soit valide dans l'URL
  const titleSlug = encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));

  return (
    <div className="flex flex-col gap-3">
      <Link href={`/shop/articles/${titleSlug}/${id}`} className="group">
        <div className="relative w-full aspect-square border-2 border-gray-400 min-w-0 min-h-0 overflow-hidden">
          <div className="size-full group-hover:scale-105 transition-transform duration-300">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="size-full object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Image
              src="/forSale/eye-icon.webp"
              alt="eye-icon"
              width={100}
              height={100}
              className="size-10 group-hover:opacity-100"
            />
          </div>
        </div>
      </Link>
      <Link href={`/shop/articles/${titleSlug}/${id}`}>
        <h2 className="h-5 font-bold line-clamp-1 text-ellipsis break-words hover:text-primary-300">
          {title}
        </h2>
      </Link>
      <div className="h-9">
        <p className="text-sm line-clamp-2 text-ellipsis break-words">
          {description}
        </p>
      </div>
      <div className="h-8 flex justify-between items-center">
        <p className="text-sm font-bold">
          {price} € <span className="text-xs">TTC</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="size-5">
            <Image
              src="/shopping-cart.png"
              alt="shopping-cart-icon"
              width={100}
              height={100}
              className="size-full"
              priority
            />
          </div>
          <Button className="w-8 aspect-square rounded-full py-0 px-0 text-xl hover:scale-110 flex justify-center items-center">
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
