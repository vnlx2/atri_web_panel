import type { IErrorResponse, ISuccessListsResponse, ISuccessResponse } from "~/types";
import type IUser from "~/types/user";

export const useUser = defineStore('user', {
  state: () => ({
    currentUser: {
      name: '',
      roleName: '',
    },
    users: [] as IUser[],
    user: {} as IUser,
  }),
  getters: {
    getCurrentName: (state) => 
      state.currentUser.name.replace(/\b\w/g, (match) => match.toUpperCase()),
    getCurrentRoleName: (state) => 
      state.currentUser.roleName.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (match) => match.toUpperCase()),
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
    storeCurrentUser(name: string, role: string) {
      this.currentUser.name = name;
      this.currentUser.roleName = role;
    },
    resetForm() {
      this.user = {
        id: '',
        username: '',
        password: '',
        role: ''
      }
    },
    async getUsers() {
      try {
        const { data } = await useFetch<ISuccessResponse>(`
        ${this.getBaseUrl()}/v1/users`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        this.users = data?.value?.data;
      } catch (error) {
        throw error;
      }
    },
    async getUser(id: string) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/user/${id}`, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        this.user = data?.value?.data;
      } catch (error) {
        throw error;
      }
    },
    async store(isUpdated: boolean = false) {
      try {
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/user/${!isUpdated ? 'store' : 'update'}`, {
          method: !isUpdated ? 'POST' : 'PUT',
          headers: this.getHeaders(),
          body: {
            ...this.user,
            role: 'admin'
          }
        });
        if (status.value === 'error') {
          throw error.value?.data as IErrorResponse;
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    async update(id: string) {
      try {
        const body = {
          id: this.user.id,
          username: this.user.username,
          oldPassword: this.user.oldPassword,
          newPassword: this.user.password,
          role: 'admin',
        }
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/user/update/${id}`, {
          method: 'PUT',
          headers: this.getHeaders(),
          body: body
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
        const { data, error, status } = await useFetch<ISuccessResponse>(`${this.getBaseUrl()}/v1/user/delete/${id}`, {
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