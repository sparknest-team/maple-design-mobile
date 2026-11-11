import type { App } from 'vue'
import _IconPinOff from './icon-pin-off.vue'

export const IconPinOff = Object.assign(_IconPinOff, {
  install(app: App) { app.component(_IconPinOff.name, _IconPinOff) },
})
