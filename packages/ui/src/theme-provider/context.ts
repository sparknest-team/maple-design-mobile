import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import { formatStyleVars } from '../utils/elements'
import type { ThemeProviderMode, ThemeProviderProps } from './props'

interface ThemeScope {
  theme: ThemeProviderMode | undefined
  preset: Record<string, string>
  overrides: Record<string, string>
  vars: Record<string, string>
}
const themeScopeKey: InjectionKey<ComputedRef<ThemeScope>> = Symbol('theme-provider-theme')

/** Presets belong to a theme boundary; explicit user overrides continue to inherit. */
export function provideThemeScope(props: Readonly<ThemeProviderProps>) {
  const parent = inject(themeScopeKey, undefined)
  const scope = computed<ThemeScope>(() => {
    const inherited = parent?.value
    const preset =
      props.theme === undefined
        ? (inherited?.preset ?? {})
        : typeof props.theme === 'object'
          ? formatStyleVars(props.theme)
          : {}
    const scheme = preset['--mp-color-scheme']
    const theme =
      typeof props.theme === 'string'
        ? props.theme
        : scheme === 'light' || scheme === 'dark'
          ? scheme
          : (inherited?.theme ?? (props.theme === undefined ? undefined : 'light'))
    const overrides = { ...inherited?.overrides, ...formatStyleVars(props.styleVars ?? null) }
    return { theme, preset, overrides, vars: { ...preset, ...overrides } }
  })
  provide(themeScopeKey, scope)
  return computed(() => ({
    'data-mp-theme': props.theme === undefined ? undefined : scope.value.theme,
    style: props.theme === undefined ? formatStyleVars(props.styleVars ?? null) : scope.value.vars,
  }))
}

/** Apply on the actual teleported root, regardless of its destination. */
export function useThemeScope() {
  const scope = inject(themeScopeKey, undefined)
  return computed(() =>
    scope
      ? {
          'data-mp-theme': scope.value.theme,
          style: scope.value.vars,
        }
      : {},
  )
}
