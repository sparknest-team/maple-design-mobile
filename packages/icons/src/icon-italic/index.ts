import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconItalic from './icon-italic.vue'

export const IconItalic: IconComponent = Object.assign(_IconItalic, {
  install(app: App) { app.component(_IconItalic.name, _IconItalic) },
})
