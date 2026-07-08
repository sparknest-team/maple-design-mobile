import { kebabCase } from '@maplejs/maple-shared'

export interface MapleImportResolverOptions {
  /**
   * compatible with unplugin-auto-import
   *
   * @default false
   */
  autoImport?: boolean

  /**
   * whether to import style
   *
   * @default true
   */
  importStyle?: boolean

  /**
   * auto import for directives
   *
   * @default true
   */
  directives?: boolean
}

const varFunctions = [
  'ImagePreview',
  'Snackbar',
  'Picker',
  'ActionSheet',
  'Dialog',
  'Locale',
  'StyleProvider',
  'LoadingBar',
]

const varDirectives = ['Ripple', 'Lazy', 'Hover']

export function getResolved(name: string, options: MapleImportResolverOptions) {
  const { importStyle = true, autoImport = false } = options

  const sideEffects = []

  if (importStyle) {
    sideEffects.push(`@maplejs/maple-ui/es/${kebabCase(name)}/style/index.mjs`)
  }

  return {
    from: '@maplejs/maple-ui',
    name: autoImport ? name : `_${name}Component`,
    sideEffects,
  }
}

export function MapleImportResolver(options: MapleImportResolverOptions = {}) {
  return [
    {
      type: 'component' as const,
      resolve: (name: string) => {
        const { autoImport = false } = options

        if (autoImport && varFunctions.includes(name)) {
          return getResolved(name, options)
        }

        if (name.startsWith('Mp')) {
          return getResolved(name.slice(2), options)
        }
      },
    },
    {
      type: 'directive' as const,
      resolve: (name: string) => {
        const { directives = true } = options

        if (!directives) {
          return
        }

        if (!varDirectives.includes(name)) {
          return
        }

        return getResolved(name, options)
      },
    },
  ]
}
