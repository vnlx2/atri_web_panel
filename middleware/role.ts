
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userController = useUser();
  if (userController.getCurrentRoleName !== 'Super Admin') {
    return navigateTo('/admin');
  }
});