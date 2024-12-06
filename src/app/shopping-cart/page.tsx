'use client';

import Section from '../components/Section';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import CartArticle from '../components/CartArticle';

export default function CartPage() {
  const cartArticles = useSelector((state: RootState) => state.cart.articles);

  const articlesData = useSelector((state: RootState) => {
    return state.shop.articles.filter((item) =>
      cartArticles.some((article) => item.id === article.id)
    );
  });

  const detailedCartProduct = articlesData.map((article) => {
    const idx = cartArticles.findIndex((item) => item.id === article.id);
    return { ...article, quantity: cartArticles[idx].quantity };
  });

  const cartArticlesJSX = detailedCartProduct.map((product, i) => {
    return (
      <CartArticle key={i} {...product} />
    )
  });

  return (
    <Section className="min-h-screen flex">
      <div className="flex-1 flex flex-col gap-32 my-24 mx-5 sm:mx-24 lg:mx-32 xl:mx-[15%]">
        <h1 className="text-7xl sm:licorice-font sm:thickening text-right">
          Your Shopping Cart
        </h1>
        <div className="flex-1 flex max-sm:flex-col justify-center gap-32">
          <div className="self-start sm:w-[500px] flex flex-col gap-20">{cartArticlesJSX}</div>
          <div className="relative sm:w-96">
            <p className="sm:sticky top-28 3xl:top-40">
              Sous total (TVA incluse): 125 €
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
