import { shallowRef } from 'vue'
import config from '@config'
import { Themes } from '@maple-design/ui-vue'
import { currentTheme, observeTheme } from './theme-state.js'

export type Theme =
  | 'lightTheme'
  | 'darkTheme'
  | 'mapleLightTheme'
  | 'mapleDarkTheme'
  | 'alpsLightTheme'
  | 'fireflyLightTheme'
  | 'alpsDarkTheme'
  | 'fireflyDarkTheme'

const themes: readonly Theme[] = [
  'lightTheme',
  'darkTheme',
  'mapleLightTheme',
  'mapleDarkTheme',
  'alpsLightTheme',
  'fireflyLightTheme',
  'alpsDarkTheme',
  'fireflyDarkTheme',
]

function isTheme(value: string | null): value is Theme {
  return value !== null && themes.includes(value as Theme)
}

export type ThemeScope = 'site' | 'demo'

export type StyleVars = Record<string, string>

function getSiteThemeKey() {
  return config?.themeKey as string
}

function getDemoThemeKey() {
  return (config?.demoThemeKey as string | undefined) ?? `${getSiteThemeKey()}_DEMO`
}

function getThemeStorageKey(scope: ThemeScope) {
  return scope === 'demo' ? getDemoThemeKey() : getSiteThemeKey()
}

function getPreferredTheme(): Theme {
  const defaultLightTheme = config?.defaultLightTheme
  const defaultDarkTheme = config?.defaultDarkTheme

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? defaultDarkTheme : defaultLightTheme
}

/** Site docs chrome theme (`themeKey`) vs mobile demo theme (`demoThemeKey`). */
export function getBrowserTheme(scope: ThemeScope = 'site'): Theme {
  const themeKey = getThemeStorageKey(scope)
  const storageTheme = window.localStorage.getItem(themeKey)

  if (isTheme(storageTheme)) {
    return storageTheme
  }

  // First visit for demo: seed from site theme so existing users keep the same look until they diverge.
  if (scope === 'demo') {
    const siteTheme = window.localStorage.getItem(getSiteThemeKey())
    const theme = isTheme(siteTheme) ? siteTheme : getPreferredTheme()
    window.localStorage.setItem(themeKey, theme)
    return theme
  }

  const theme = getPreferredTheme()
  window.localStorage.setItem(themeKey, theme)
  return theme
}

export function persistTheme(theme: Theme, scope: ThemeScope = 'site') {
  window.localStorage.setItem(getThemeStorageKey(scope), theme)
}

export function withSiteConfigNamespace(styleVars: Record<string, any>) {
  return Object.entries(styleVars).reduce((styleVars, [key, value]) => {
    styleVars[`--site-config-${key}`] = value as string
    return styleVars
  }, {} as StyleVars)
}

export const currentThemePreset = shallowRef<StyleVars>(Themes.default.light)
export const currentStyleVars = shallowRef<Record<string, string>>({})
export { currentTheme }

const themeMap = {
  lightTheme: Themes.default.light,
  darkTheme: Themes.default.dark,
  mapleLightTheme: Themes.maple.light,
  mapleDarkTheme: Themes.maple.dark,
  alpsLightTheme: Themes.alps.light,
  fireflyLightTheme: Themes.firefly.light,
  alpsDarkTheme: Themes.alps.dark,
  fireflyDarkTheme: Themes.firefly.dark,
}

export function setTheme(theme: Theme) {
  currentThemePreset.value = themeMap[theme] ?? Themes.default.light
  currentStyleVars.value = getSiteStyleVars(theme)
  setColorScheme(theme)
  currentTheme.value = theme
}

export function onThemeChange(cb?: (theme: Theme) => void, scope: ThemeScope = 'site') {
  const theme = currentTheme.value ?? getBrowserTheme(scope)
  setTheme(theme)
  if (cb) {
    observeTheme(cb)
  }
}

export function getSiteStyleVars(theme: Theme) {
  return withSiteConfigNamespace(
    config[theme] ||
      (theme === 'alpsLightTheme' || theme === 'fireflyLightTheme'
        ? config.lightTheme
        : theme === 'alpsDarkTheme' || theme === 'fireflyDarkTheme'
          ? config.darkTheme
          : {}) ||
      {},
  )
}

export function setColorScheme(theme: Theme) {
  document.documentElement.style.setProperty('color-scheme', theme.toLowerCase().includes('dark') ? 'dark' : 'light')
}
