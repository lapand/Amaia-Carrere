import { ArticleCardType } from "./article";

type deletedArticles = {
  id: string;
  title: string;
};

export type RefreshedDataType = {
  updatedArticles: ArticleCardType[];
  deletedArticles: deletedArticles[];
  alertMsg: string[];
};
