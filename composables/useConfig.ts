import type { IErrorResponse, ISuccessResponse } from "~/types";
import type { IStorageProvider } from "~/types/config";

export const useConfig = defineStore('config', {
  state: () => ({
    storageProviders: [] as IStorageProvider[],
  }),
  getters: {},
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
    async getStorageProviders() {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/config/provider`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        this.storageProviders = data?.value?.data;
      }
      catch (error) {
        throw error;
      }
    },
    async saveStorageProviders() {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/config/provider/store`, {
          method: 'PUT',
          headers: this.getHeaders(),
          body: {
            data: this.storageProviders
          }
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        return data;
      }
      catch (error) {
        throw error;
      }
    
    }
  }
});