import { MapleConfig } from '../config/maple.config.js';
export declare function build(mapleConfig: Required<MapleConfig>, io: {
    entry: string;
    output: string;
}): Promise<void>;
export interface IconsCommandOptions {
    watch?: boolean;
}
export declare function icons({ watch }?: IconsCommandOptions): Promise<void>;
