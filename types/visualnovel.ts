export interface IVisualNovelUrl {
  language?: string;
  provider: string;
  type: string;
  platform: string;
  url: string;
}

export interface IVisualNovelUrlCategorical {
  jp_link: IVisualNovelUrl[];
  en_link: IVisualNovelUrl[];
  id_link: IVisualNovelUrl[];
}

export interface IVisualNovels {
  code: string;
  title: string;
  hasDownloadUrls: boolean;
}

export interface IVisualNovel {
  code: string;
  title: string;
  aliases?: string;
  length: number;
  rating: number;
  description: string;
  image: string;
  downloadUrl: IVisualNovelUrlCategorical | undefined;
}

export interface IVisualNovelForm extends Omit<IVisualNovel,'downloadUrl'> {
  downloadUrl: IVisualNovelUrl[];
}