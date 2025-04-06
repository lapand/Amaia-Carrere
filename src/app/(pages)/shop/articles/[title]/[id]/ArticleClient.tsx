'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import ShopSlider from '@/components/ShopSlider';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { ArticleCardType } from '@/types';
import Link from 'next/link';
import {
  setStaticUpdatedAt,
  updateArticles,
} from '@/store/slices/articleSlice';
import useViewportWidth from '@/hooks/useViewportWidth';
import { smBreakpoint, lgBreakpoint } from '@/data/breakpoints';
import ProductSelection from '@/components/ProductSelection';
import { routes } from '@/config/config.global';

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

  // Synchronisation du store avec les props statiques uniquement si les props contiennent des données plus récentes que celles du store.
  // Une vérification de la fraicheur des données sera faite à chaque nouveau rendu SSG ISR afin de savoir si une mise à jour doit être effectuée avec les nouvelles props statiques.
  useEffect(() => {
    if (staticArticle && fetchTimestamp) {
      const { staticUpdatedAt, dynamicUpdatedAt } = shop;
      const shouldSyncArticles =
        (!staticUpdatedAt && !dynamicUpdatedAt) ||
        (!dynamicUpdatedAt && fetchTimestamp > (staticUpdatedAt || 0)) ||
        (!staticUpdatedAt && fetchTimestamp > (dynamicUpdatedAt || 0)) ||
        (fetchTimestamp > (dynamicUpdatedAt || 0) &&
          fetchTimestamp > (staticUpdatedAt || 0));

      if (shouldSyncArticles) {
        dispatch(updateArticles([staticArticle]));
        dispatch(setStaticUpdatedAt(fetchTimestamp));
      }
    }
  }, [dispatch, staticArticle, fetchTimestamp, shop]);

  let content;
  if (!currentArticle) {
    content = (
      <div className="flex flex-col justify-center items-center gap-20">
        <p className="text-xl">Article non trouvé</p>
        <Link
          href={routes.shop}
          className="transition-transform duration-300 hover:rotate-2"
        >
          <Button className="text-xl px-8 py-4">Retour à la boutique</Button>
        </Link>
      </div>
    );
  } else {
    const {
      id,
      gallery,
      title,
      description,
      price,
      about,
      available,
      languages,
    } = currentArticle;

    const aboutJSX = about
      .split('\n')
      .map((line, index) => <div key={index}>{line || <br />}</div>);

    const titleJSX = (
      <h1 className="text-primary-600 lg:mb-10 line-clamp-2 text-ellipsis break-words regards text-3xl sm:text-3.5xl 2xl:text-4xl">
        {title}
      </h1>
    );

    content = (
      <>
        <div className="relative">
          <div className="sm:sticky top-24 xl:top-36 3xl:top-40 sm:max-lg:w-3/4 mx-auto flex flex-col max-lg:items-center gap-3 sm:gap-6 lg:gap-10 3xl:gap-20">
            <Link href={routes.shop} className="self-start group">
              <Button
                className="flex items-center px-4 sm:px-5 py-1 sm:py-3"
                aria-label={`to shop page`}
              >
                <span className="text-3xl sm:text-xl transition-transform group-hover:-translate-x-1">
                  &#8592;
                </span>
                {windowWidth >= smBreakpoint && (
                  <span className="ml-2">Boutique</span>
                )}
              </Button>
            </Link>
            {windowWidth < lgBreakpoint && titleJSX}
            <div className="max-sm:w-full max-sm:aspect-square sm:size-[430px] lg:size-80 xl:size-[400px] 3xl:size-[430px] flex justify-center items-center overflow-hidden">
              <ShopSlider gallery={gallery} />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[500px] lg:w-96 xl:w-[500px] 2xl:w-[450px] 3xl:w-[550px] flex flex-col gap-6 sm:gap-10">
          <div>
            {windowWidth >= lgBreakpoint && titleJSX}
            <p>
              <span className="underline underline-offset-4 text-2xl annie-use-your-telescope font-bold">
                Description de l&#39;article :
              </span>
              <br />
              <br />
              <span className="max-lg:text-lg line-clamp-2 text-ellipsis break-words">
                {description}
              </span>
            </p>
          </div>
          <hr className="border border-gray-400" />
          {!available ? (
            <div className="text-lg sm:text-xl lg:text-base 2xl:text-[17px] text-red-600 font-bold">
              Actuellement indisponible
            </div>
          ) : (
            <div className="max-sm:mr-3">
              <ProductSelection id={id} price={price} languages={languages} />
            </div>
          )}
          <hr className="border border-gray-400" />
          <div className="max-lg:text-lg">{aboutJSX}</div>
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 flex max-lg:flex-col justify-center max-lg:items-center gap-6 sm:gap-10 lg:gap-20 xl:gap-28 3xl:gap-36">
      {content}
    </div>
  );
};

export default ArticleClient;
