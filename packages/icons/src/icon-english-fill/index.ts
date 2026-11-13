import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEnglishFill from './icon-english-fill.vue'

export const IconEnglishFill: IconComponent = Object.assign(_IconEnglishFill, {
  install(app: App) { app.component(_IconEnglishFill.name, _IconEnglishFill) },
})
