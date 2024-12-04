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
    addArticles(state, action: PayloadAction<ArticleCardType[]>) {
      state.articles = [...state.articles, ...action.payload];
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
      action: PayloadAction<{ title: string; data: Partial<ArticleCardType> }>
    ) {
      const index = state.articles.findIndex(
        (article) => article.title === action.payload.title
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

export const { addArticles, removeArticle, resetArticles, updateArticle } =
  articleSlice.actions;
export default articleSlice.reducer;
