import { ArticleCardType } from "./article";

type deletedArticles = {
  id: string;
  title: string;
};

export type NewDataType = {
  updatedArticles: ArticleCardType[];
  deletedArticles: deletedArticles[];
  alertMsg: string[];
};
