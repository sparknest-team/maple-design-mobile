import { onUnmounted } from 'vue'
import { ThemeProvider } from '@maple-design/ui-vue'
import AppType from './appType'
import { getBrowserTheme, type Theme } from './theme.js'

export * from './theme.js'

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

export { AppType, ThemeProvider }

export { normalizeLanguage, getSavedLanguage, saveLanguage, createDemoMessages } from './language'
