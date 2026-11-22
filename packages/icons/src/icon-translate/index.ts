import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTranslate from './icon-translate.vue'

export const IconTranslate: IconComponent = Object.assign(_IconTranslate, {
  install(app: App) { app.component(_IconTranslate.name!, _IconTranslate) },
})
