import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUnderline from './icon-underline.vue'

export const IconUnderline: IconComponent = Object.assign(_IconUnderline, {
  install(app: App) { app.component(_IconUnderline.name!, _IconUnderline) },
})
