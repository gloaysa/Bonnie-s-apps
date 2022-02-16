export enum MainRoutes {
    home = '/',
    splitNames = '/splitNames',
    webDownloader = '/webDownloader'
}

export interface IMainRoute {
    label: string;
    href: MainRoutes;
    description?: string;
}
