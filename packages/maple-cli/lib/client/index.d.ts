import { StyleProvider } from '@nio-pow/maple-ui';
import AppType from './appType';
interface PCLocationInfo {
    language: string;
    menuName: string;
    hash: string;
}
export type Theme = 'lightTheme' | 'darkTheme' | 'md3LightTheme' | 'md3DarkTheme';
export type StyleVars = Record<string, string>;
export declare function getPCLocationInfo(): PCLocationInfo;
export declare function getBrowserTheme(): Theme;
export declare function watchLang(cb: (lang: string) => void, platform?: 'pc' | 'mobile'): void;
export declare function withSiteConfigNamespace(styleVars: Record<string, any>): StyleVars;
export declare function watchPlatform(cb: (platform: string) => void): void;
export declare function useRouteListener(cb: () => void): void;
export declare function setTheme(theme: Theme): void;
export declare function onThemeChange(cb?: (theme: Theme) => void): void;
export declare function getSiteStyleVars(theme: Theme): StyleVars;
export declare function setColorScheme(theme: Theme): void;
export declare function watchTheme(cb: (theme: Theme, from: 'pc' | 'mobile' | 'default' | 'playground') => void, shouldUnmount?: boolean): void;
export declare function getMobileIndex(): "./mobile" | "./mobile.html";
export { AppType, StyleProvider };
