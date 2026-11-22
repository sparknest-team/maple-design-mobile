import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLanguage from './icon-language.vue'

export const IconLanguage: IconComponent = Object.assign(_IconLanguage, {
  install(app: App) { app.component(_IconLanguage.name!, _IconLanguage) },
})
