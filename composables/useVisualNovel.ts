import type { IDashboard, ISuccessResponse } from "~/types";
import type * as VisualNovel from "~/types/visualnovel";


const runtimeConfig = useRuntimeConfig();
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${useCookie('token').value}`
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
        const { data } = await useFetch<ISuccessResponse>(`${runtimeConfig.public.apiBase}/v1/visualnovels/dashboard`,
          {
            method: 'GET',
            headers: headers
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
        const { data } = await useFetch<VisualNovel.IVisualNovels[]>(`${runtimeConfig.public.apiBase}/v1/visualnovels?page=${page}`)
        this.visualNovels = data.value ?? [];
        return this.visualNovels;
      } catch (error) {
        console.log(error)
      }
    },
    async getVisualNovel(id: number) {
      try {
        const { data } = await useFetch<VisualNovel.IVisualNovel>(`${runtimeConfig.public.apiBase}/v1/visualnovel/${id}`)
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
        const response = await useFetch<VisualNovel.IVisualNovel>(`${runtimeConfig.public.apiBase}/v1/visualnovel/store`, {
          method: 'POST',
          headers: headers,
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
        await useFetch<VisualNovel.IVisualNovel>(`${runtimeConfig.public.apiBase}/v1/visualnovel/update`, {
          method: 'PUT',
          body: body
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteVisualNovel(code: string) {
      try {
        await useFetch(`${runtimeConfig.public.apiBase}/v1/visualnovel/delete/${code}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
});