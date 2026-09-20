declare module '@ui-foundation/ui-build' {
  export function defineConfig<T>(config: T): T
  export function buildLibrary(config: Record<string, unknown>): Promise<void>
}
