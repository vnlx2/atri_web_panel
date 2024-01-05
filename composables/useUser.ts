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
    storeCurrentUser(name: string, role: string) {
      this.currentUser.name = name;
      this.currentUser.roleName = role;
    }
  }
})