import { FormattedImage } from './homepage';

export type newsArticle = {
  mainImg: FormattedImage;
  title: string;
  content: string;
  linkText: string;
  link: string;
  gallery: FormattedImage[];
};
