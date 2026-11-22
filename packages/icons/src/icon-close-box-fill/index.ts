import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloseBoxFill from './icon-close-box-fill.vue'

export const IconCloseBoxFill: IconComponent = Object.assign(_IconCloseBoxFill, {
  install(app: App) { app.component(_IconCloseBoxFill.name!, _IconCloseBoxFill) },
})
