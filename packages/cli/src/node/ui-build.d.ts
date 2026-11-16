declare module '@sparknest/ui-build-vue' {
  export function defineConfig<T>(config: T): T
  export function buildLibrary(config: Record<string, unknown>): Promise<void>
  export function downlevelVueDeclarations(root: string, output: string, ts: typeof import('typescript')): void
}

declare module '@sparknest/ui-build-vue/browser-targets' {
  export const browserTargets: readonly string[]
}
