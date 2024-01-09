import type { ISuccessListsResponse, IErrorResponse, ISuccessResponse } from "~/types";
import type { IBirthday, IBirthdays } from "~/types/birthday";

export const useBirthday = defineStore('birthday', {
  state: () => ({
    birthdays: [] as IBirthdays[],
    birthdayTotal: 0,
    birthday: {} as IBirthday,
  }),
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
    resetForm() {
      this.birthday = {
        id: '',
        month: 1,
        day: 1,
      }
    },
    async getBirthdays(page: number) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse & ISuccessListsResponse>(`
        ${this.getBaseUrl()}/v1/birthdays?page=${page}`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        this.birthdays = data.value?.data?.list ?? [];
        this.birthdayTotal = data.value?.data?.total ?? 0;
      } catch (error) {
        throw error;
      }
    },
    async getBirthday(id: string) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/birthday/${id}`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        this.birthday = data.value?.data ?? {};
      } catch (error) {
        throw error;
      }
    },
    async store(isUpdated: boolean) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/birthday/${!isUpdated ? 'store' : 'update'}`, {
          method: !isUpdated ? 'POST' : 'PUT',
          headers: this.getHeaders(),
          body: this.birthday
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    async delete(id: string) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/birthday/delete/${id}`, {
          method: 'DELETE',
          headers: this.getHeaders(),
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
});