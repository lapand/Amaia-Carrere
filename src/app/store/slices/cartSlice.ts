import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartArticle } from '@/app/types';

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
    // Ajouter un article au panier ou augmenter la quantité si déjà présent
    addToCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.articles.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1; // Augmente la quantité si l'article est déjà dans le panier
      } else {
        state.articles.push({ id: itemId, quantity: 1 }); // Ajoute l'article au panier
      }
    },

    // Diminuer la quantité d'un article
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const existingItem = state.articles.find((item) => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Diminue la quantité
        } else {
          state.articles = state.articles.filter((item) => item.id !== itemId); // Supprime si quantité atteint 0
        }
      }
    },

    // Retirer un article du panier
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.articles = state.articles.filter((item) => item.id !== itemId);
    },

    // Modifier la quantité d'un article
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.articles.find((item) => item.id === id);

      if (existingItem) {
        if (quantity > 0) {
          existingItem.quantity = quantity; // Met à jour la quantité
        } else {
          state.articles = state.articles.filter((item) => item.id !== id); // Supprime si quantité <= 0
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
