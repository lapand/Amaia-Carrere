import Image from 'next/image';
import Link from 'next/link';
import { ArticleCardType } from '@/types';
import QuantitySelector from './QuantitySelector';

const ArticleCard: React.FC<ArticleCardType> = ({
  id,
  gallery,
  title,
  description,
  price,
  available,
}) => {
  // Formatage du titre de l'article afin qu'il soit valide dans l'URL
  const titleSlug = encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));

  let imgPlaceholder;
  if (gallery.length === 0) {
    imgPlaceholder = (
      <div className="size-full flex justify-center items-center">
        Aucune image disponible
      </div>
    );
  } else {
    imgPlaceholder = (
      <div className="size-full group-hover:scale-105 transition-transform duration-300">
        <Image {...gallery[0]} className="size-full object-contain" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Link href={`/shop/articles/${titleSlug}/${id}`} className="group">
        <div className="relative w-full aspect-square border border-gray-500 min-w-0 min-h-0 overflow-hidden">
          {imgPlaceholder}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Image
              src="/forSale/eye-icon.webp"
              alt="eye-icon"
              width={100}
              height={100}
              className="size-8 group-hover:opacity-100"
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
        {!available ? (
          <div className="text-sm text-red-600 font-bold">
            Actuellement indisponible
          </div>
        ) : (
          <>
            <p className="text-sm font-bold">
              {price} € <span className="text-xs">TTC</span>
            </p>
            <QuantitySelector id={id} size={'sm'} />
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
