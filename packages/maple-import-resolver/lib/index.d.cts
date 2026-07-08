interface MapleImportResolverOptions {
    /**
     * compatible with unplugin-auto-import
     *
     * @default false
     */
    autoImport?: boolean;
    /**
     * whether to import style
     *
     * @default true
     */
    importStyle?: boolean;
    /**
     * auto import for directives
     *
     * @default true
     */
    directives?: boolean;
}
declare function getResolved(name: string, options: MapleImportResolverOptions): {
    from: string;
    name: string;
    sideEffects: string[];
};
declare function MapleImportResolver(options?: MapleImportResolverOptions): ({
    type: "component";
    resolve: (name: string) => {
        from: string;
        name: string;
        sideEffects: string[];
    } | undefined;
} | {
    type: "directive";
    resolve: (name: string) => {
        from: string;
        name: string;
        sideEffects: string[];
    } | undefined;
})[];

export { MapleImportResolver, MapleImportResolverOptions, getResolved };
