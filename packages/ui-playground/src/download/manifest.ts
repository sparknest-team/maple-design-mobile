interface DownloadManifest {
  name: string
  dependencies: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}

export function createDownloadManifest(
  template: DownloadManifest,
  selected: { mapleVersion?: string; vueVersion?: string; typescriptVersion?: string },
  current: { mapleVersion: string; vueVersion: string; typescriptVersion: string },
) {
  const mapleVersion =
    selected.mapleVersion && selected.mapleVersion !== 'preview' ? selected.mapleVersion : current.mapleVersion
  return {
    ...template,
    private: true,
    devDependencies: {
      ...template.devDependencies,
      typescript: selected.typescriptVersion || current.typescriptVersion,
    },
    dependencies: {
      ...template.dependencies,
      '@maple-design/ui-vue': mapleVersion,
      '@maple-design/touch-emulator-vue': mapleVersion,
      vue: selected.vueVersion || current.vueVersion,
    },
  }
}
