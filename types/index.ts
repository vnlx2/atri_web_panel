import type IUser from "./user";
import type { IVisualNovel, IVisualNovels } from "./visualnovel";

export interface IDashboard {
  vndb: number;
  all: number;
  withDownloadUrl: number;
}

export interface ISuccessListsResponse {
  list: IVisualNovels[];
  page: number;
  total: number;
}

export interface ISuccessResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface IValidationError {
  field: string;
  message: string;
}

export interface IErrorResponse {
  success: boolean;
  statusCode: number;
  errorCode: string;
  message: string;
  errors?: any
}

export const checkErrorInterface = (value: IErrorResponse): value is IErrorResponse => !!value?.statusCode;