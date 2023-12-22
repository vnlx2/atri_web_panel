import type { IDashboard, ISuccessResponse, IVisualNovel } from "~/types";

const runtimeConfig = useRuntimeConfig();
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${useCookie('token').value}`
}

export const useVisualNovel = defineStore('visualNovel', {
  state: () => ({
    visualNovels: [] as IVisualNovel[],
    dashboard: {
      vndb: 0,
      all: 0,
      withDownloadUrl: 0,
    } as IDashboard,
  }),
  actions: {
    async getVisualNovelsDashboard() {
      try {
        const { data } = await useFetch<ISuccessResponse>(`${runtimeConfig.public.apiBase}/v1/visualnovels/dashboard`,
          {
            method: 'GET',
            headers: headers
          }
        );
        console.log(data.value);
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
        const { data } = await useFetch<IVisualNovel[]>(`${runtimeConfig.public.apiBase}/api/v1/visualnovels?page=${page}`)
        this.visualNovels = data.value ?? [];
        return this.visualNovels;
      } catch (error) {
        console.log(error)
      }
    },
    async getVisualNovel(id: number) {
      try {
        const { data } = await useFetch<IVisualNovel>(`${runtimeConfig.public.apiBase}/api/v1/visualnovel/${id}`)
        return data.value;
      } catch (error) {
        console.log(error)
      }
    },
    async createVisualNovel(data: IVisualNovel) {
      try {
        await useFetch<IVisualNovel>(`${runtimeConfig.public.apiBase}/api/v1/visualnovel/store`, {
          method: 'POST',
          body: data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async updateVisualNovel(id: number, data: IVisualNovel) {
      try {
        await useFetch<IVisualNovel>(`${runtimeConfig.public.apiBase}/api/v1/visualnovel/update`, {
          method: 'PUT',
          body: data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteVisualNovel(id: number) {
      try {
        await useFetch<IVisualNovel>(`${runtimeConfig.public.apiBase}/api/v1/visualnovel/delete/${id}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
});