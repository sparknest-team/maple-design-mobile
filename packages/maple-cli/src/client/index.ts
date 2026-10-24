import { onMounted, onUnmounted } from 'vue'
import config from '@config'
import { StyleProvider, Themes } from '@maple-design/ui'
import AppType from './appType'
import { resolveDemoLanguage } from './language'
import { currentTheme, observeTheme } from './theme-state'

interface PCLocationInfo {
  language: string
  menuName: string
  hash: string
}

export type Theme = 'lightTheme' | 'darkTheme' | 'mapleLightTheme' | 'mapleDarkTheme'

const themes: readonly Theme[] = ['lightTheme', 'darkTheme', 'mapleLightTheme', 'mapleDarkTheme']

function isTheme(value: string | null): value is Theme {
  return value !== null && themes.includes(value as Theme)
}

export type ThemeScope = 'site' | 'demo'

export type StyleVars = Record<string, string>

export function getPCLocationInfo(): PCLocationInfo {
  const [, language, path] = window.location.hash.split('/')
  const [menuName, hash = ''] = path?.split('#') ?? []

  return {
    language,
    menuName,
    hash,
  }
}

function getHashSearch() {
  const { href } = window.location
  const hashSearch = href.slice(href.indexOf('?'))

  return new URLSearchParams(hashSearch)
}

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

export function watchLang(cb: (lang: string) => void, platform?: 'pc' | 'mobile') {
  const handleHashchange = () => {
    cb(resolveDemoLanguage(window.location.hash, platform))
  }

  useRouteListener(handleHashchange)
  handleHashchange()
}

export function withSiteConfigNamespace(styleVars: Record<string, any>) {
  return Object.entries(styleVars).reduce((styleVars, [key, value]) => {
    styleVars[`--site-config-${key}`] = value as string
    return styleVars
  }, {} as StyleVars)
}

export function watchPlatform(cb: (platform: string) => void) {
  const handleHashchange = () => {
    const platform = getHashSearch().get('platform') ?? 'mobile'
    cb(platform)
  }

  useRouteListener(handleHashchange)
  handleHashchange()
}

export function useRouteListener(cb: () => void) {
  onMounted(() => {
    window.addEventListener('hashchange', cb)
    window.addEventListener('popstate', cb)
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener('popstate', cb)
  })
}

const themeMap = {
  lightTheme: Themes.default.light,
  darkTheme: Themes.default.dark,
  mapleLightTheme: Themes.maple.light,
  mapleDarkTheme: Themes.maple.dark,
}

export function setTheme(theme: Theme) {
  const siteStyleVars = withSiteConfigNamespace(config[theme] || {})
  const styleVars = { ...siteStyleVars, ...(themeMap[theme] ?? {}) }
  StyleProvider.setStyleVars(styleVars)
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
  return withSiteConfigNamespace(config[theme] || {})
}

export function setColorScheme(theme: Theme) {
  document.documentElement.style.setProperty('color-scheme', theme.toLowerCase().includes('dark') ? 'dark' : 'light')
}

export function watchTheme(
  cb: (theme: Theme, from: 'pc' | 'mobile' | 'default' | 'playground') => void,
  shouldUnmount = true,
) {
  const handleThemeChange = (event: MessageEvent) => {
    const { data } = event
    if (data?.action === 'theme-change') {
      cb(data.data, data.from)
    }
  }

  window.addEventListener('message', handleThemeChange)

  if (shouldUnmount) {
    onUnmounted(() => {
      window.removeEventListener('message', handleThemeChange)
    })
  }

  cb(getBrowserTheme('site'), 'default')
}

export function getMobileIndex() {
  // Vite's dev server serves mobile.html from its root, even when the PC
  // document was opened through a nested history-fallback URL.
  if ((import.meta as ImportMeta & { env: { DEV: boolean } }).env.DEV) {
    return '/mobile.html'
  }

  const isCf = config._cf.some((path: string) => window.location.origin.includes(path))
  return isCf ? './mobile' : './mobile.html'
}

export { AppType, StyleProvider }

export { normalizeLanguage, getSavedLanguage, saveLanguage, createDemoMessages } from './language'
