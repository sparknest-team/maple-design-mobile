import { type MapleConfig } from '../config/maple.config.js';
export interface TemplateHighlightCompilerOptions {
    md: string;
    json: string;
    titleAttributes: RegExp;
    titleEvents: RegExp;
    titleSlots: RegExp;
}
export declare const replaceDot: (s: string) => string;
export declare const replaceVersion: (s: string) => string;
export declare const replaceUnderline: (s: string) => string;
export declare function parseTable(table: string): string[][];
export declare function compileTable(md: string, titleRe: RegExp): string;
export declare function compileWebTypes(table: Record<string, any>, webTypes: Record<string, any>, componentName: string, mapleConfig: Required<MapleConfig>): void;
export declare function compileMD(path: string, webTypes: Record<string, any>, mapleConfig: Required<MapleConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileDir(path: string, webTypes: Record<string, any>, mapleConfig: Required<MapleConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileLanguageMD(mapleConfig: Required<MapleConfig>, options: TemplateHighlightCompilerOptions): void;
export declare function compileTemplateHighlight(): Promise<void>;
