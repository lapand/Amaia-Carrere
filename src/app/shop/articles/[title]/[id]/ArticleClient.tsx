'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Section from '@/app/components/Section';
import ShopSlider from '@/app/components/ShopSlider';
import Image from 'next/image';
import Button from '@/app/components/Button';
import { useEffect } from 'react';
import { ArticleCardType } from '@/app/types';
import Link from 'next/link';
import { syncArticles } from '@/app/store/slices/articleSlice';
import { addToCart } from '@/app/store/slices/cartSlice';

type ArticleClientType = {
  article?: ArticleCardType;
};

const ArticleClient: React.FC<ArticleClientType> = ({ article }) => {
  const dispatch = useDispatch();

  // Met à jour le store avec l'article si nécessaire
  useEffect(() => {
    article && dispatch(syncArticles([article]));
  }, []);

  let content;
  if (!article) {
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
    const { id, gallery, title, description, price } = article;
    content = (
      <>
        <div className="relative">
          <div className="sm:sticky top-28 3xl:top-40 sm:size-96 2xl:size-[500px] flex justify-center items-center overflow-hidden">
            <ShopSlider gallery={gallery} />
          </div>
        </div>
        <div className="self-start sm:max-w-96 flex flex-col gap-20">
          <div>
            <h1 className="inspiration-font text-6xl sm:text-8xl mb-10">
              {title}
            </h1>
            <p>
              <span className="text-lg sm:text-xl underline">Description:</span>
              <br />
              <br />
              {description}
            </p>
          </div>
          <hr className="border border-gray-400" />
          <div className="flex justify-between items-center">
            <p className="text-lg sm:text-xl">
              {price} € <span className="text-xs sm:text-sm">TTC</span>
            </p>
            <div className="flex items-center gap-2">
              <div className="size-7">
                <Image
                  src="/shopping-cart.png"
                  alt="shopping-cart-icon"
                  width={100}
                  height={100}
                  className="size-full"
                  priority
                />
              </div>
              <Button
                onClick={() => dispatch(addToCart(id))}
                className="w-10 aspect-square rounded-full py-0 px-0 text-2xl hover:scale-105 flex justify-center items-center"
              >
                +
              </Button>
            </div>
          </div>
          <hr className="border border-gray-400" />
          <p>
            <span className="text-lg sm:text-xl underline">A propos:</span>
            <br />
            <br /> Livre de poche réalisé avec amour.
            <br /> Histoire de fion dans l espace intrasidérale en combinaison
            spatiale.
            <br />
            <br /> Dessins réalisés au crayon. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Dolorem rem consectetur magnam debitis
            doloribus atque dolorum iusto, illo, consequatur labore excepturi
            totam quibusdam? Nulla fuga corporis autem eaque, ipsam doloribus.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consectetur quia nostrum officiis in asperiores non nesciunt,
            deserunt optio fuga dolore facilis ab, quam quibusdam tempora eius
            delectus fugit, enim fugiat. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Ratione, magnam. Excepturi in similique sed
            adipisci, explicabo cum, consequuntur beatae repellat itaque eveniet
            id quas distinctio amet dicta, eligendi dolorem rem.
          </p>
        </div>
      </>
    );
  }

  return (
    <Section className="min-h-screen flex">
      <div className="flex-1 flex flex-col gap-10 sm:gap-20 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        <Link
          href="/shop"
          className="self-start group transition-transform duration-300 hover:scale-105"
        >
          <Button className="flex items-center rounded-xl px-4 py-3">
            <span className="text-xl transition-transform group-hover:-translate-x-1">&#8592;</span>
            <span className="ml-2">boutique</span>
          </Button>
        </Link>
        <div className="flex-1 flex max-sm:flex-col justify-center gap-16 sm:gap-44">
          {content}
        </div>
      </div>
    </Section>
  );
};

export default ArticleClient;
