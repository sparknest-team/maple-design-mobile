import type { App } from 'vue'
import _IconPinOffFill from './icon-pin-off-fill.vue'

export const IconPinOffFill = Object.assign(_IconPinOffFill, {
  install(app: App) { app.component(_IconPinOffFill.name, _IconPinOffFill) },
})
