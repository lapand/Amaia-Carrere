import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleCardType } from '@/types';

type ArticlesState = {
  articles: ArticleCardType[];
  staticUpdatedAt: number | null;
  dynamicUpdatedAt: number | null;
};

const initialState: ArticlesState = {
  articles: [],
  staticUpdatedAt: null,
  dynamicUpdatedAt: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // Ajouter un ou plusieurs articles
    syncArticles(state, action: PayloadAction<ArticleCardType[]>) {
      action.payload.forEach((newArticle) => {
        const existingIndex = state.articles.findIndex(
          (article) => article.id === newArticle.id
        );

        if (existingIndex === -1) {
          // Si l'article n'existe pas, on l'ajoute
          state.articles.push(newArticle);
        } else {
          // Si l'article existe, on vérifie updatedAt
          if (
            new Date(newArticle.updatedAt) >
            new Date(state.articles[existingIndex].updatedAt)
          ) {
            state.articles[existingIndex] = newArticle;
          }
        }
      });
    },
    // Supprimer un article par son id
    removeArticle(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
    // Réinitialiser la liste des articles
    resetArticles(state) {
      state.articles = [];
    },
    // Mettre à jour un article par son titre
    updateArticle(
      state,
      action: PayloadAction<{ id: string; data: Partial<ArticleCardType> }>
    ) {
      const index = state.articles.findIndex(
        (article) => article.id === action.payload.id
      );
      if (index !== -1) {
        state.articles[index] = {
          ...state.articles[index],
          ...action.payload.data,
        };
      }
    },
    // Rendre l'article indisponible par son id
    setUnavailable(state, action: PayloadAction<string>) {
      const article = state.articles.find((item) => item.id === action.payload);
      if (article) {
        article.available = false;
      }
    },
    setStaticUpdatedAt(state, action: PayloadAction<number | null>) {
      state.staticUpdatedAt = action.payload;
    },
    setDynamicUpdatedAt(state, action: PayloadAction<number | null>) {
      state.dynamicUpdatedAt = action.payload;
    },
  },
});

export const {
  syncArticles,
  removeArticle,
  resetArticles,
  updateArticle,
  setUnavailable,
  setStaticUpdatedAt,
  setDynamicUpdatedAt,
} = articleSlice.actions;
export default articleSlice.reducer;
