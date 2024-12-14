'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Section from '@/components/Section';
import ShopSlider from '@/components/ShopSlider';
import Image from 'next/image';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { ArticleCardType } from '@/types';
import Link from 'next/link';
import { syncArticles } from '@/store/slices/articleSlice';
import { addToCart } from '@/store/slices/cartSlice';
import QuantitySelector from '@/components/QuantitySelector';

type ArticleClientType = {
  article?: ArticleCardType;
};

const ArticleClient: React.FC<ArticleClientType> = ({ article }) => {
  const dispatch = useDispatch();

  // Initialisation et mise à jour (à chaque rendu SSG ISR) du store avec les données de l'article
  useEffect(() => {
    article && dispatch(syncArticles([article]));
  }, [article, dispatch]);

  // Mise à jour du rendu à partir du store, les données de l'article pouvant être modifiées après la validation du panier si il y a discordance avec les données de la bdd.
  const currentArticle = useSelector((state: RootState) =>
    state.shop.articles.find((a) => a.id === article?.id)
  );

  let content;
  if (!currentArticle) {
    content = (
      <div className="flex flex-col justify-center items-center gap-20">
        <p className="text-xl">Article non trouvé</p>
        <Link
          href="/shop"
          className="transition-transform duration-300 hover:scale-105 hover:rotate-3"
        >
          <Button className="text-xl rounded-3xl px-8 py-4">
            Retour à la boutique
          </Button>
        </Link>
      </div>
    );
  } else {
    const { id, gallery, title, description, price, about, available } =
      currentArticle;
    // console.log(about);
    const aboutJSX = about
      .split('\n')
      .map((line, index) => <div key={index}>{line || <br />}</div>);
    // console.log(aboutJSX);
    content = (
      <>
        <div className="relative">
          <div className="sm:sticky top-28 3xl:top-40 flex flex-col gap-10 sm:gap-20">
            <Link
              href="/shop"
              className="self-start group transition-transform duration-300 hover:scale-105"
            >
              <Button className="flex items-center rounded-xl px-4 py-3">
                <span className="text-xl transition-transform group-hover:-translate-x-1">
                  &#8592;
                </span>
                <span className="ml-2">boutique</span>
              </Button>
            </Link>
            <div className="sm:size-96 2xl:size-[500px] flex justify-center items-center overflow-hidden">
              <ShopSlider gallery={gallery} />
            </div>
          </div>
        </div>
        <div className="self-start sm:max-w-96 2xl:max-w-[500px] flex flex-col gap-10">
          <div>
            <h1 className="inspiration-font text-6xl sm:text-7xl mb-10">
              {title}
            </h1>
            <p>
              <span className="text-lg underline">
                Description de l'article :
              </span>
              <br />
              <br />
              <span className="sm:text-lg line-clamp-2 text-ellipsis break-words">
                {description}
              </span>
            </p>
          </div>
          <hr className="border border-gray-400" />
          <div className="flex justify-between items-center">
            {!available ? (
              <div className="text-lg text-red-600 font-bold">
                Actuellement indisponible
              </div>
            ) : (
              <>
                <p className="text-lg sm:text-xl">
                  {price} € <span className="text-xs sm:text-sm">TTC</span>
                </p>
                <QuantitySelector id={id} size={'md'} />
              </>
            )}
          </div>
          <hr className="border border-gray-400" />
          <div>{aboutJSX}</div>
        </div>
      </>
    );
  }

  return (
    <Section className="min-h-screen flex">
      <div className="flex-1 flex max-sm:flex-col justify-center gap-16 sm:gap-44 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        {content}
      </div>
    </Section>
  );
};

export default ArticleClient;
