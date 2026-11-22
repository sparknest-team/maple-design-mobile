import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPinFill from './icon-pin-fill.vue'

export const IconPinFill: IconComponent = Object.assign(_IconPinFill, {
  install(app: App) { app.component(_IconPinFill.name!, _IconPinFill) },
})
