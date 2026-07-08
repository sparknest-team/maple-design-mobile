import { InlineConfig, Plugin } from 'vite';
import { MapleConfig, type MapleConfigHtmlInject } from './maple.config.js';
export declare function getHtmlInject(inject: MapleConfigHtmlInject): {
    head: {
        start: (string | undefined)[];
        end: (string | undefined)[];
        scriptStart: (string | undefined)[];
    };
    body: {
        start: (string | undefined)[];
        end: (string | undefined)[];
        scriptStart: (string | undefined)[];
    };
};
export declare function getPlugins(mapleConfig: Required<MapleConfig>): Plugin[];
export declare function getDevConfig(mapleConfig: Required<MapleConfig>): InlineConfig;
export declare function getBuildConfig(mapleConfig: Required<MapleConfig>): InlineConfig;
export interface BundleBuildOptions {
    fileName: string;
    cssFileName: string;
    output: string;
    format: 'es' | 'cjs' | 'umd';
    removeEnv: boolean;
    emptyOutDir: boolean;
}
export declare function getBundleConfig(mapleConfig: Required<MapleConfig>, buildOptions: BundleBuildOptions): InlineConfig;
export type ExtensionMode = 'dev' | 'build';
export declare function getExtensionConfig(mode: ExtensionMode): InlineConfig;
