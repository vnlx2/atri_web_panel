export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token');

    if (!token.value) {
        return navigateTo('/login');
    }
    else if(token.value && ['/', '/login'].includes(to.path)) {
      return navigateTo('/admin');
    }
})