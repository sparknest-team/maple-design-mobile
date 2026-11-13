import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPinOffFill from './icon-pin-off-fill.vue'

export const IconPinOffFill: IconComponent = Object.assign(_IconPinOffFill, {
  install(app: App) { app.component(_IconPinOffFill.name, _IconPinOffFill) },
})
