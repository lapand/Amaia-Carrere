import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartArticle, ArticleLanguageType } from '@/types';

type CartState = {
  articles: CartArticle[];
};

const initialState: CartState = {
  articles: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajoute des articles au panier
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        language?: ArticleLanguageType;
      }>
    ) => {
      const { id, language, quantity } = action.payload;

      // Vérifie si un article correspondant est déjà dans le panier
      const existingItem = state.articles.find(
        (item) =>
          item.id === id &&
          (item.selectedLanguage?.code === language?.code ||
            (!item.selectedLanguage && !language))
      );

      if (existingItem) {
        // Si l'article est déjà présent, ajoute la quantité spécifiée
        existingItem.quantity += quantity;
      } else {
        // Sinon, ajoute un nouvel article avec la quantité spécifiée
        state.articles.push({ id, quantity, selectedLanguage: language });
      }
    },

    // Diminuer la quantité d'un article
    decrementQuantity: (
      state,
      action: PayloadAction<{ id: string; language?: ArticleLanguageType }>
    ) => {
      const { id, language } = action.payload;
      const existingItem = state.articles.find(
        (item) =>
          item.id === id &&
          (item.selectedLanguage?.code === language?.code ||
            (!item.selectedLanguage && !language))
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Diminue la quantité
        } else {
          state.articles = state.articles.filter(
            (item) =>
              !(
                item.id === id &&
                (item.selectedLanguage?.code === language?.code ||
                  (!item.selectedLanguage && !language))
              )
          ); // Supprime si quantité atteint 0
        }
      }
    },

    // Retirer les articles du panier de même id et de même langue
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; language?: ArticleLanguageType }>
    ) => {
      const { id, language } = action.payload;
      state.articles = state.articles.filter(
        (item) =>
          !(
            item.id === id &&
            (item.selectedLanguage?.code === language?.code ||
              (!item.selectedLanguage && !language))
          )
      );
    },

    // Modifier la quantité d'un article
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        language?: ArticleLanguageType;
        quantity: number;
      }>
    ) => {
      const { id, language, quantity } = action.payload;
      const existingItem = state.articles.find(
        (item) =>
          item.id === id &&
          (item.selectedLanguage?.code === language?.code ||
            (!item.selectedLanguage && !language))
      );

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity; // Met à jour la quantité
        } else {
          state.articles = state.articles.filter(
            (item) =>
              !(
                item.id === id &&
                (item.selectedLanguage?.code === language?.code ||
                  (!item.selectedLanguage && !language))
              )
          ); // Supprime si quantité <= 0
        }
      }
    },

    // Réinitialiser le panier
    clearCart: (state) => {
      state.articles = [];
    },
  },
});

export const {
  addToCart,
  decrementQuantity,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
