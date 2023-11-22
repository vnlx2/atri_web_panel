import { isAuthenticated } from "~/composables/authentication";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token');
  const authentication = isAuthenticated(token.value ?? '');
  if (authentication && ['/', '/login'].includes(to.path)) {
    return navigateTo('/admin');
  }
  else if (!authentication && to.path !== '/login') {
    return navigateTo('/login');
  }
})