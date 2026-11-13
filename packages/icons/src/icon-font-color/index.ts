import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFontColor from './icon-font-color.vue'

export const IconFontColor: IconComponent = Object.assign(_IconFontColor, {
  install(app: App) { app.component(_IconFontColor.name, _IconFontColor) },
})
