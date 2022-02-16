import {matchPath, PathMatch, useLocation} from 'react-router-dom';
import {IMainRoute, MainRoutes} from './main-routes';

export const mainRoutes: IMainRoute[] = [
    {
        label: 'Home',
        href: MainRoutes.home,
        description: 'Welcome to Bonnie\'s Apps!'
    },
    {
        label: 'Split Names',
        href: MainRoutes.splitNames
    },
    {
        label: 'Web Downloader',
        href: MainRoutes.webDownloader
    }
]

export const useRouteMatch = (patterns: readonly string[]): PathMatch => {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export const getCurrentRoute = (): IMainRoute => {
    const currentRoute = useRouteMatch(mainRoutes.map(route => route.href));
    return mainRoutes.find(route => route.href === currentRoute?.pattern?.path);
}
