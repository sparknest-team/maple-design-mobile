import { build } from 'vite';
import { getExtensionConfig } from '../config/vite.config.js';
export async function extension(mode) {
    await build(getExtensionConfig(mode));
}
