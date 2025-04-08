import Image from 'next/image';
import Link from 'next/link';
import { ArticleCardType } from '@/types';
import { routes } from '@/config/config.global';

const ArticleCard: React.FC<ArticleCardType> = ({
  id,
  gallery,
  title,
  description,
  price,
  available,
}) => {
  const articleURL = routes.article(title, id);

  let imgPlaceholder;
  if (gallery.length === 0) {
    imgPlaceholder = (
      <div className="size-full flex justify-center items-center">
        Aucune image disponible
      </div>
    );
  } else {
    imgPlaceholder = (
      <div className="size-full hover-article-scale-105 transition-transform duration-300">
        <Image {...gallery[0]} className="size-full object-contain" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-sm:mb-8">
      <Link href={articleURL} className="group">
        <div className="relative w-full aspect-square border border-neutral-400 min-w-0 min-h-0 overflow-hidden">
          {imgPlaceholder}
          <div className="absolute inset-0 bg-black opacity-0 hover-article-opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 opacity-0 hover-article-opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Image
              src="/eye-icon.webp"
              alt="eye-icon"
              width={100}
              height={100}
              className="size-8 hover-article-opacity-100"
            />
          </div>
        </div>
      </Link>
      <Link href={articleURL}>
        <h2 className="h-5 max-sm:text-sm font-bold line-clamp-1 text-ellipsis break-words hover:text-[#d9860a]">
          {title}
        </h2>
      </Link>
      <div className="h-9">
        <p className="text-sm line-clamp-2 text-ellipsis break-words">
          {description}
        </p>
      </div>
      <div className="h-7 flex justify-between items-center">
        {!available ? (
          <p className="text-sm text-red-600 font-bold">
            Actuellement indisponible
          </p>
        ) : (
          <p className="text-sm font-bold">
            {price} € <span className="text-xs sm:text-xs">TTC</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
