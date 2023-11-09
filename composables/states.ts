export const profileMenuShown = () => useState<boolean>('isProfileMenuShown', () => false);
export const setProfileMenuShown = (shown: boolean) => profileMenuShown().value = shown;

export const sidebarOpen = () => useState<boolean>('isSidebarOpen', () => false);
export const setSidebarOpen = (open: boolean) => sidebarOpen().value = open;