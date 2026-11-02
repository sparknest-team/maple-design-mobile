declare module '@sparknest/ui-build' {
  export function defineConfig<T>(config: T): T
  export function buildLibrary(config: Record<string, unknown>): Promise<void>
}

declare module '@sparknest/ui-build/browser-targets' {
  export const browserTargets: readonly string[]
}
