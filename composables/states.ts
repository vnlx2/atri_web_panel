export const pageTitle = () => useState<string>('pageTitle', () => '');
export const setPageTitle = (title: string) => pageTitle().value = title;