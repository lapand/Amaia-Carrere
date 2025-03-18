type ImageFormat = {
  width: number;
  height: number;
  url: string;
};

export type ImageData = {
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats: Record<string, ImageFormat>;
};

export type FormattedImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  formats: Record<string, ImageFormat>;
};

export type BackgroundData = {
  url: string;
};

export type APIHomePageType = {
  heroMobile: BackgroundData;
  heroDesktop: BackgroundData;
  illustrationsJeunesse: ImageData[];
  bandesDessinees: ImageData[];
  fantasy: ImageData[];
};

export type HeroBg = {
  heroMobile: string;
  heroDesktop: string;
};

export type PagesOverviewData = {
  illustrationsJeunesse: FormattedImage[];
  bandesDessinees: FormattedImage[];
  fantasy: FormattedImage[];
};

export type FormattedHomePage = HeroBg & PagesOverviewData;
