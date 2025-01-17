import { createSelector } from 'reselect';
import { RootState } from '../configureStore';

// Sélecteurs de base
const selectShopArticles = (state: RootState) => state.shop.articles;
const selectCartItems = (state: RootState) => state.cart.articles;

// Sélecteur mémoïsé
export const selectDetailedCartProducts = createSelector(
  [selectShopArticles, selectCartItems],
  (articles, cartItems) =>
    cartItems
      .map((item) => {
        const matchingArticle = articles.find(
          (article) => article.id === item.id
        );
        if (matchingArticle) {
          return {
            ...matchingArticle,
            quantity: item?.quantity || 0,
            selectedLanguage: item?.selectedLanguage || undefined,
          };
        }
      })
      .filter((item) => item !== undefined)
);
