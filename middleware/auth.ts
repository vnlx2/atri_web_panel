import { isAuthenticated } from "~/composables/authentication";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token');
  let authentication: boolean;
  if (token.value === undefined) {
    authentication = false;
  }
  else {
    authentication = await isAuthenticated(token.value ?? '');
  }
  if (authentication && ['/', '/login'].includes(to.path)) {
    return navigateTo('/admin');
  }
  else if (!authentication && to.path !== '/login') {
    token.value = null;
    return navigateTo('/login');
  }
})