import { onMounted, onUnmounted } from 'vue'
import config from '@config'
import { StyleProvider, Themes } from '@maplejs/maple-ui'
import AppType from './appType'

interface PCLocationInfo {
  language: string
  menuName: string
  hash: string
}

export type Theme = 'lightTheme' | 'darkTheme' | 'md3LightTheme' | 'md3DarkTheme'

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
  const storageTheme = window.localStorage.getItem(themeKey) as Theme | null

  if (storageTheme) {
    return storageTheme
  }

  // First visit for demo: seed from site theme so existing users keep the same look until they diverge.
  if (scope === 'demo') {
    const siteTheme = window.localStorage.getItem(getSiteThemeKey()) as Theme | null
    const theme = siteTheme || getPreferredTheme()
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

export function watchLang(cb: (lang: string) => void, platform: 'pc' | 'mobile' = 'mobile') {
  const handleHashchange = () => {
    const language = platform === 'mobile' ? (getHashSearch().get('language') ?? 'zh-CN') : getPCLocationInfo().language
    cb(language)
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
  lightTheme: null,
  darkTheme: Themes.dark,
  md3LightTheme: Themes.md3Light,
  md3DarkTheme: Themes.md3Dark,
}

export function setTheme(theme: Theme) {
  const siteStyleVars = withSiteConfigNamespace(config[theme] || {})
  const styleVars = { ...siteStyleVars, ...(themeMap[theme] ?? {}) }
  StyleProvider.setStyleVars(styleVars)
  setColorScheme(theme)
}

export function onThemeChange(cb?: (theme: Theme) => void, scope: ThemeScope = 'site') {
  const theme = getBrowserTheme(scope)
  setTheme(theme)
  cb?.(theme)
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
  const isCf = config._cf.some((path: string) => window.location.origin.includes(path))
  return isCf ? './mobile' : './mobile.html'
}

export { AppType, StyleProvider }

export { normalizeLanguage, getSavedLanguage, saveLanguage, createDemoMessages } from './language'
