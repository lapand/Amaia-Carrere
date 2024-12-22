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
    syncArticles(state, action: PayloadAction<ArticleCardType[]>) {
      const incomingArticles = action.payload;

      // Construire un Set contenant les IDs des articles entrants
      const incomingIds = new Set(
        incomingArticles.map((article) => article.id)
      );

      // Filtrer les articles existants pour ne conserver que ceux présents dans les articles entrants
      state.articles = state.articles.filter((article) =>
        incomingIds.has(article.id)
      );

      // Ajouter ou mettre à jour les articles entrants
      incomingArticles.forEach((newArticle) => {
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

    // Ajouter un ou plusieurs articles
    updateArticles(state, action: PayloadAction<ArticleCardType[]>) {
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
  updateArticles,
  setUnavailable,
  setStaticUpdatedAt,
  setDynamicUpdatedAt,
} = articleSlice.actions;
export default articleSlice.reducer;
