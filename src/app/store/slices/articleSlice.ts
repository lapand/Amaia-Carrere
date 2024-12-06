import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleCardType } from '@/app/types';

type ArticlesState = {
  articles: ArticleCardType[];
};

const initialState: ArticlesState = {
  articles: [],
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
    // Supprimer un article par son titre
    removeArticle(state, action: PayloadAction<string>) {
      state.articles = state.articles.filter(
        (article) => article.title !== action.payload
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
  },
});

export const { syncArticles, removeArticle, resetArticles, updateArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
