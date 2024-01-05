import type { IDashboard, IErrorResponse, ISuccessListsResponse, ISuccessResponse } from "~/types";
import type * as VisualNovel from "~/types/visualnovel";

interface IVisualNovelFilter {
  page: number;
  keyword: string;
  hasDownloadUrl: boolean;
}

const languageDict: Record<string, string> = {
  'jp_link': 'jp',
  'en_link': 'en',
  'id_link': 'id'
}

export const useVisualNovel = defineStore('visualNovel', {
  state: () => ({
    visualNovels: [] as VisualNovel.IVisualNovels[],
    visualNovelForm: {} as VisualNovel.IVisualNovelForm,
    dashboard: {
      vndb: 0,
      all: 0,
      withDownloadUrl: 0,
    } as IDashboard,
  }),
  getters: {
    
  },
  actions: {
    getBaseUrl() {
      return useRuntimeConfig().public.apiBase;
    },
    getHeaders() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`
      }
    },
    resetVisualNovelForm() {
      this.visualNovelForm = {
        code: '',
        title: '',
        aliases: '',
        length: 1,
        rating: 0,
        description: '',
        image: '',
        downloadUrl: [] as VisualNovel.IVisualNovelUrl[],
      };
    },
    setApiData(apiData: VisualNovel.IVisualNovel) {
      this.visualNovelForm = {
        code: apiData.code,
        title: apiData.title,
        aliases: apiData.aliases ?? '',
        length: apiData.length,
        rating: apiData.rating,
        description: apiData.description,
        image: apiData.image,
        downloadUrl: (apiData.downloadUrl !== undefined) ? this.transformApiDownloadUrls(apiData.downloadUrl) : [],
      }
    },
    transformApiDownloadUrls(apiDownloadUrls: VisualNovel.IVisualNovelUrlCategorical) {
      return Object.entries(apiDownloadUrls).flatMap(([lang, urls]) => {
        return urls.map((url: VisualNovel.IVisualNovelUrl): VisualNovel.IVisualNovelUrl => ({
          language: languageDict[lang],
          provider: url.provider,
          type: url.type,
          platform: url.platform,
          url: url.url,
        }))
      }) as VisualNovel.IVisualNovelUrl[];
    },
    transformToApiDownloadUrls(formDownloadUrls: VisualNovel.IVisualNovelUrl[]) {
      const result: VisualNovel.IVisualNovelUrlCategorical = {
        'jp_link': [],
        'en_link': [],
        'id_link': [],
      };
      formDownloadUrls.forEach(url => {
        const lang = (Object.entries(languageDict).find(([, val]) => val === url.language) ?? [''])[0];
        result[lang as keyof VisualNovel.IVisualNovelUrlCategorical].push(url);
      });
      return result;
    },
    async getVisualNovelsDashboard() {
      try {
        const { data } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/visualnovels/dashboard`,
          {
            method: 'GET',
            headers: this.getHeaders(),
          }
        );
        this.dashboard = (data.value) ? data.value.data as IDashboard : {
          vndb: 0,
          all: 0,
          withDownloadUrl: 0,
        };
        return data;
      } catch (error) {
        throw error;
      }
    },
    async getVisualNovels(filter: IVisualNovelFilter) {
      try {
        this.visualNovels = []; // reset visual novels list to empty list
        const { data } = await useFetch<ISuccessResponse & ISuccessListsResponse>(`
          ${this.getBaseUrl()}/v1/visualnovels?page=${filter.page}&keyword=${filter.keyword}&hasDownloadUrl=${filter.hasDownloadUrl}`, {
            method: 'GET',
            headers: this.getHeaders(),
          }
        );
        this.visualNovels = data?.value?.data?.list ?? [];
        return true;
      } catch (error) {
        throw error;
      }
    },
    async getVisualNovel(id: number) {
      try {
        if (this.visualNovelForm.code === '' || this.visualNovelForm.code !== id.toString()) {
          const { data, error, status } = await useFetch<ISuccessResponse & VisualNovel.IVisualNovel>(
            `${this.getBaseUrl()}/v1/visualnovel/${id}`, {
              method: 'GET',
              headers: this.getHeaders(),
            }
          );
          if (status.value === "error") {
            throw {
              success: false,
              statusCode: error.value?.statusCode,
              errorCode: error.value?.data.errorCode,
              message: error.value?.data.message,
            } as IErrorResponse;
          }
          this.resetVisualNovelForm();
          this.setApiData(data.value?.data);
        }
      } catch (error) {
        throw error;
      }
    },
    async createVisualNovel(data: VisualNovel.IVisualNovelForm) {
      try {
        const { downloadUrl, ...form } = data;
        const body: VisualNovel.IVisualNovel = {
          ...form,
          downloadUrl: downloadUrl.length > 0 ? this.transformToApiDownloadUrls(downloadUrl) : undefined,
        };
        const response = await useFetch<VisualNovel.IVisualNovel>(`${this.getBaseUrl()}/v1/visualnovel/store`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: body
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async updateVisualNovel(data: VisualNovel.IVisualNovelForm) {
      try {
        const { downloadUrl, ...form } = data;
        const body: VisualNovel.IVisualNovel = {
          ...form,
          downloadUrl: downloadUrl.length > 0 ? this.transformToApiDownloadUrls(downloadUrl) : undefined,
        };
        const response = await useFetch<VisualNovel.IVisualNovel>(`${this.getBaseUrl()}/v1/visualnovel/update`, {
          method: 'PUT',
          headers: this.getHeaders(),
          body: body
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async deleteVisualNovel(code: string) {
      try {
        await useFetch(`${this.getBaseUrl()}/v1/visualnovel/delete/${code}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
        })
      } catch (error) {
        throw error;
      }
    }
  }
});