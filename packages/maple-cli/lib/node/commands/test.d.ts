interface TestCommandOptions {
    watch?: boolean;
    component?: string;
    coverage?: boolean;
}
export declare function test({ component, watch, coverage }: TestCommandOptions): Promise<void>;
export {};
