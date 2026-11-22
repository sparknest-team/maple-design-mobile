import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPinOff from './icon-pin-off.vue'

export const IconPinOff: IconComponent = Object.assign(_IconPinOff, {
  install(app: App) { app.component(_IconPinOff.name!, _IconPinOff) },
})
