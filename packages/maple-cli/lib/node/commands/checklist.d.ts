export interface CheckBlock {
    type: string;
    list: string[];
}
export declare function getCheckBlocks(html: string): CheckBlock[];
export declare function checklist(gitParams: string): void;
