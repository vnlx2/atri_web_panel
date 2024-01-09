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
        month: 0,
        day: 0,
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
    } 
  }
});