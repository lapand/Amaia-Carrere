'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const ArticlePage = () => {
  // Récupère l'ID de la route dynamique pour chercher l'article dans le store
  const params = useParams();
  const article = useSelector((state: RootState) =>
    state.shop.articles.find((article) => article.id === params.id)
  );
  console.log(params.id);
  

  if (!article) {
    return <div>Article non trouvé</div>;
  }

  const { img, title, description, price } = article;

  return (
    <div className="size-full flex flex-col gap-10 justify-center items-center">
      <h1>{title}</h1>
      <div className="">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="size-full object-contain"
        />
      </div>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
};

export default ArticlePage;
