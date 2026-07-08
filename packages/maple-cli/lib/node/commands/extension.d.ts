import { type ExtensionMode } from '../config/vite.config.js';
export type ExtensionCommandMode = ExtensionMode;
export declare function extension(mode: ExtensionCommandMode): Promise<void>;
