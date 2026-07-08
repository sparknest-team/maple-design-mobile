import { onMounted, onUnmounted } from 'vue'
import config from '@config'
import { StyleProvider, Themes } from '@maplejs/maple-ui'
import AppType from './appType'

export function getPCLocationInfo() {
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
export function getBrowserTheme() {
  const themeKey = config?.themeKey
  const defaultLightTheme = config?.defaultLightTheme
  const defaultDarkTheme = config?.defaultDarkTheme
  const storageTheme = window.localStorage.getItem(themeKey)
  if (!storageTheme) {
    const preferTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? defaultDarkTheme
      : defaultLightTheme
    window.localStorage.setItem(themeKey, preferTheme)
    return preferTheme
  }
  return storageTheme
}
export function watchLang(cb, platform = 'mobile') {
  const handleHashchange = () => {
    const language = platform === 'mobile' ? (getHashSearch().get('language') ?? 'zh-CN') : getPCLocationInfo().language
    cb(language)
  }
  useRouteListener(handleHashchange)
  handleHashchange()
}
export function withSiteConfigNamespace(styleVars) {
  return Object.entries(styleVars).reduce((styleVars, [key, value]) => {
    styleVars[`--site-config-${key}`] = value
    return styleVars
  }, {})
}
export function watchPlatform(cb) {
  const handleHashchange = () => {
    const platform = getHashSearch().get('platform') ?? 'mobile'
    cb(platform)
  }
  useRouteListener(handleHashchange)
  handleHashchange()
}
export function useRouteListener(cb) {
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
export function setTheme(theme) {
  const siteStyleVars = withSiteConfigNamespace(config[theme] || {})
  const styleVars = { ...siteStyleVars, ...(themeMap[theme] ?? {}) }
  StyleProvider(styleVars)
  setColorScheme(theme)
}
export function onThemeChange(cb) {
  watchTheme((theme) => {
    setTheme(theme)
    cb?.(theme)
  })
}
export function getSiteStyleVars(theme) {
  return withSiteConfigNamespace(config[theme] || {})
}
export function setColorScheme(theme) {
  document.documentElement.style.setProperty('color-scheme', theme.toLowerCase().includes('dark') ? 'dark' : 'light')
}
export function watchTheme(cb, shouldUnmount = true) {
  const handleThemeChange = (event) => {
    const { data } = event
    if (data.action === 'theme-change') {
      cb(data.data, data.from)
    }
  }
  window.addEventListener('message', handleThemeChange)
  if (shouldUnmount) {
    onUnmounted(() => {
      window.removeEventListener('message', handleThemeChange)
    })
  }
  cb(getBrowserTheme(), 'default')
}
export function getMobileIndex() {
  const isCf = config._cf.some((path) => window.location.origin.includes(path))
  return isCf ? './mobile' : './mobile.html'
}
export { AppType, StyleProvider }
