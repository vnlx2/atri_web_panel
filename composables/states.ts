export const profileMenuShown = () => useState<boolean>('isProfileMenuShown', () => false);
export const setProfileMenuShown = (shown: boolean) => profileMenuShown().value = shown;