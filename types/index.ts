interface IVisualNovelUrl {
  provider: string;
  type: string;
  platform: string;
  url: string;
}

export interface IVisualNovel {
  code: string;
  title: string;
  aliases?: string;
  length: number;
  rating: number;
  description: string;
  image: string;
}

export interface IDashboard {
  vndb: number;
  all: number;
  withDownloadUrl: number;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
  data?: IVisualNovel | IVisualNovel[] | IDashboard;
}