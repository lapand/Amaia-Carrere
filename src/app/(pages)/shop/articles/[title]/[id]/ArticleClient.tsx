'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import StaticSlider from '@/components/StaticSlider';
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
import LoadableImage from '@/components/LoadableImage';
import removeContextMenu from '@/utils/removeContextMenu';

type ArticleClientType = {
  staticArticle?: ArticleCardType;
  fetchTimestamp: number | null;
};

const arrowIconUri = '/black-arrow.svg';

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

    const customArrows = (
      <span className="w-3/5 aspect-square flex items-center justify-center rounded-full bg-aubergine-100/90 border-2 border-aubergine-700">
        <span
          style={{ backgroundImage: `url(${arrowIconUri})` }}
          className="size-full bg-no-repeat bg-[length:20px_20px] bg-center"
        />
      </span>
    );

    content = (
      <>
        <div className="relative">
          <div className="sm:sticky top-24 xl:top-36 3xl:top-40 sm:max-lg:w-3/4 mx-auto flex flex-col max-lg:items-center gap-3 sm:gap-6 lg:gap-10 3xl:gap-20">
            <Link href={routes.shop} className="self-start group">
              <Button
                className="flex items-center px-4 sm:px-5 py-1 sm:py-2"
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
            <div className="w-[17rem] xs:w-[18rem] sm:w-[32rem] lg:w-[28rem] xl:w-[34rem] 3xl:w-[35rem] flex justify-center items-center overflow-hidden">
              <StaticSlider
                isControlArrowsVisible={windowWidth >= smBreakpoint}
                isPaginationVisible={true}
                maxSlides={7}
                transitionDuration={0.5}
                customArrows={customArrows}
                arrowBtnStyle={{
                  width: '4rem',
                }}
                arrowBtnHoverStyle={{
                  backgroundImage: `radial-gradient(ellipse at left,rgba(117, 69, 145, .7),rgba(117, 69, 145, 0) 70%)`,
                }}
              >
                {gallery.map((img, i) => (
                  <LoadableImage
                    key={i}
                    className="size-full object-contain"
                    {...img}
                    priority={i === 0}
                    onContextMenu={removeContextMenu}
                  />
                ))}
              </StaticSlider>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[32rem] lg:w-96 xl:w-[32rem] 3xl:w-[35rem] flex flex-col gap-6 sm:gap-10">
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
    <div className="flex-1 flex max-lg:flex-col justify-center max-lg:items-center gap-6 sm:gap-10 xl:gap-28 3xl:gap-36">
      {content}
    </div>
  );
};

export default ArticleClient;

// Seule la première image du slider, visible dès le chargement de la page,
// est marquée avec `priority={true}` pour que Next.js la précharge immédiatement (via <link rel="preload"> dans le <head>).
// Cela optimise le LCP (Largest Contentful Paint) et améliore les performances.
// Les autres images seront chargées de manière lazy par défaut (chargement de l'img lors de son premier rendu).
