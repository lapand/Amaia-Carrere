'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Section from '@/components/Section';
import ShopSlider from '@/components/ShopSlider';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { ArticleCardType } from '@/types';
import Link from 'next/link';
import { setStaticUpdatedAt, syncArticles } from '@/store/slices/articleSlice';
import QuantitySelector from '@/components/QuantitySelector';
import useViewportWidth from '@/hooks/useViewportWidth';
import { mobileBreakpoint } from '@/config/config';

type ArticleClientType = {
  staticArticle?: ArticleCardType;
  fetchTimestamp: number | null;
};

const ArticleClient: React.FC<ArticleClientType> = ({
  staticArticle,
  fetchTimestamp,
}) => {
  const dispatch = useDispatch();

  const windowWidth = useViewportWidth();

  // Mise à jour du rendu à partir du store et non à partir des props statiques car les données des articles peuvent être modifiées après la validation du panier si il y a discordance avec les données de la bdd.
  const shop = useSelector((state: RootState) => state.shop);

  const currentArticle = shop.articles.find((a) => a.id === staticArticle?.id);

  // Synchronisation du store avec les props statiques uniquement si les props contiennent des données plus récentes que celles du store
  // Un nouveau rendu SSG ISR provoquera ainsi une mise à jour du store tandis que des données modifiées dynamiquement dans le store (par exemple, par l'invalidation d'un article d'un panier après comparaison à la bdd) seront rendues prioritairement.
  // Cela permet ainsi de profiter des optimisations SSG/ISR (SEO, performances) en mettant à jour les données en temps réel lors d'une action utilisateur (comme la discordance d'informations entre le panier utilisateur et les articles correspondants en base de données).
  useEffect(() => {
    if (staticArticle) {
      const { staticUpdatedAt, dynamicUpdatedAt } = shop;

      if (
        !staticUpdatedAt ||
        !dynamicUpdatedAt ||
        staticUpdatedAt > dynamicUpdatedAt
      ) {
        dispatch(syncArticles([staticArticle]));
        dispatch(setStaticUpdatedAt(fetchTimestamp));
      }
    }
  }, [dispatch, staticArticle, shop]);

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
          <div className="sm:sticky top-24 xl:top-36 3xl:top-40 flex flex-col gap-6 lg:gap-10 3xl:gap-20">
            <Link
              href="/shop"
              className="max-sm:fixed max-sm:z-30 self-start group transition-transform duration-300 hover:scale-105"
            >
              <Button className="flex items-center rounded-xl px-4 py-2 sm:py-3">
                <span className="text-2xl sm:text-xl transition-transform group-hover:-translate-x-1">
                  &#8592;
                </span>
                {windowWidth >= mobileBreakpoint && (
                  <span className="ml-2">boutique</span>
                )}
              </Button>
            </Link>
            <div className="max-sm:w-full max-sm:aspect-square sm:size-[500px] lg:size-80 xl:size-[400px] 3xl:size-[550px] flex justify-center items-center overflow-hidden">
              <ShopSlider gallery={gallery} />
            </div>
          </div>
        </div>
        <div className="sm:w-[500px] lg:w-96 xl:w-[500px] 2xl:w-[450px] 3xl:w-[550px] flex flex-col gap-10">
          <div>
            <h1 className="inspiration-font text-7xl sm:text-6.5xl xl:text-7xl mb-6 sm:mb-10 max-lg:text-center">
              {title}
            </h1>
            <p>
              <span className="text-xl lg:text-lg underline">
                Description de l'article :
              </span>
              <br />
              <br />
              <span className="text-lg line-clamp-2 text-ellipsis break-words">
                {description}
              </span>
            </p>
          </div>
          <hr className="border border-gray-400" />
          <div className="flex justify-between items-center">
            {!available ? (
              <div className="text-lg sm:text-xl lg:text-lg text-red-600 font-bold">
                Actuellement indisponible
              </div>
            ) : (
              <>
                <p className="text-xl">
                  {price} € <span className="text-sm">TTC</span>
                </p>
                <QuantitySelector id={id} size={'md'} />
              </>
            )}
          </div>
          <hr className="border border-gray-400" />
          <div className='max-lg:text-lg'>{aboutJSX}</div>
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 flex max-lg:flex-col justify-center max-lg:items-center gap-6 sm:gap-10 lg:gap-16 xl:gap-20 3xl:gap-36">
      {content}
    </div>
  );
};

export default ArticleClient;
