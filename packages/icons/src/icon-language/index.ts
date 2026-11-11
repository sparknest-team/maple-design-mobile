import type { App } from 'vue'
import _IconLanguage from './icon-language.vue'

export const IconLanguage = Object.assign(_IconLanguage, {
  install(app: App) { app.component(_IconLanguage.name, _IconLanguage) },
})
