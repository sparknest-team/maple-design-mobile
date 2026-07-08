import { pathToFileURL } from 'url';
import { isArray, mergeWith } from '@nio-pow/maple-shared';
import fse from 'fs-extra';
import { MAPLE_CONFIG, SITE_CONFIG } from '../shared/constant.js';
import { outputFileSyncOnChange } from '../shared/fsUtils.js';
const { pathExistsSync, statSync } = fse;
export function defineConfig(config) {
    return config;
}
export function mergeStrategy(_, srcValue, key) {
    const keys = ['features', 'members', 'versions', 'themes', '_cf'];
    if (keys.includes(key) && isArray(srcValue)) {
        return srcValue;
    }
}
export async function getMapleConfig(emit = false) {
    const defaultConfig = (await import('./maple.default.config.js')).default;
    const config = pathExistsSync(MAPLE_CONFIG)
        ? (await import(`${pathToFileURL(MAPLE_CONFIG).href}?_t=${statSync(MAPLE_CONFIG).mtimeMs}`)).default
        : {};
    const mergedConfig = mergeWith(defaultConfig, config, mergeStrategy);
    if (emit) {
        const source = JSON.stringify(mergedConfig, null, 2);
        outputFileSyncOnChange(SITE_CONFIG, source);
    }
    return mergedConfig;
}
