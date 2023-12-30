import type { IDashboard, ISuccessListsResponse, ISuccessResponse } from "~/types";
import type * as VisualNovel from "~/types/visualnovel";

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
        aliases: apiData.aliases,
        length: apiData.length,
        rating: apiData.rating,
        description: apiData.description,
        image: apiData.image,
        downloadUrl: this.transformApiDownloadUrls(apiData.downloadUrl),
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
    async getVisualNovels(page: number) {
      try {
        this.visualNovels = []; // reset visual novels list to empty list
        const { data } = await useFetch<ISuccessResponse & ISuccessListsResponse>(`${this.getBaseUrl()}/v1/visualnovels?page=${page}`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        console.log(data?.value?.data?.list);
        this.visualNovels = data?.value?.data?.list ?? [];
        return true;
      } catch (error) {
        throw error;
      }
    },
    async getVisualNovel(id: number) {
      try {
        const { data } = await useFetch<VisualNovel.IVisualNovel>(`${this.getBaseUrl()}/v1/visualnovel/${id}`, {
          method: 'GET',
          headers: this.getHeaders(),
        })
        return data.value;
      } catch (error) {
        console.log(error)
      }
    },
    async createVisualNovel(data: VisualNovel.IVisualNovelForm) {
      try {
        const { downloadUrl, ...form } = data;
        const body: VisualNovel.IVisualNovel = {
          ...form,
          downloadUrl: this.transformToApiDownloadUrls(downloadUrl),
        };
        const response = await useFetch<VisualNovel.IVisualNovel>(`${this.getBaseUrl()}/v1/visualnovel/store`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: body
        });
        return response;
      } catch (error) {
        console.log(error)
      }
    },
    async updateVisualNovel(data: VisualNovel.IVisualNovelForm) {
      try {
        const { downloadUrl, ...form } = data;
        const body: VisualNovel.IVisualNovel = {
          ...form,
          downloadUrl: this.transformToApiDownloadUrls(downloadUrl),
        };
        await useFetch<VisualNovel.IVisualNovel>(`${this.getBaseUrl()}/v1/visualnovel/update`, {
          method: 'PUT',
          headers: this.getHeaders(),
          body: body
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteVisualNovel(code: string) {
      try {
        await useFetch(`${this.getBaseUrl()}/v1/visualnovel/delete/${code}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
});