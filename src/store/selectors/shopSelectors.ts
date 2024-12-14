import { createSelector } from 'reselect';
import { RootState } from '../store';

// Sélecteurs de base
const selectShopArticles = (state: RootState) => state.shop.articles;
const selectCartItems = (state: RootState) => state.cart.articles;

// Sélecteur mémoïsé
export const selectDetailedCartProducts = createSelector(
  [selectShopArticles, selectCartItems],
  (articles, cartItems) =>
    articles
      .filter((item) => cartItems.some((article) => item.id === article.id))
      .map((article) => {
        const cartItem = cartItems.find((item) => item.id === article.id);
        return { ...article, quantity: cartItem?.quantity || 0 };
      })
);
