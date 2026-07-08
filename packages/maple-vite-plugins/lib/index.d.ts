import { Plugin } from 'vite';

interface MarkdownOptions {
    style?: string;
}
declare function markdown(options: MarkdownOptions): Plugin;

interface HtmlOptions {
    data?: Record<string, string | string[] | Record<string, any>>;
}
declare function html(options: HtmlOptions): Plugin;

interface InlineCssOptions {
    cssFile: string;
    jsFile: string;
    onEnd?(): void;
}
declare function inlineCss(options: InlineCssOptions): Plugin;

interface CopyPath {
    from: string;
    to: string;
    type: 'folder' | 'file';
}
interface CopyOptions {
    paths: CopyPath[];
}
declare function copy(options: CopyOptions): Plugin;

export { CopyOptions, CopyPath, HtmlOptions, InlineCssOptions, MarkdownOptions, copy, html, inlineCss, markdown };
