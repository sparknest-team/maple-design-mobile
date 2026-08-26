import type { App } from 'vue'
import _IconPinOffOutline from './icon-pin-off-outline.vue'

export const IconPinOffOutline = Object.assign(_IconPinOffOutline, {
  install(app: App) {
    app.component(_IconPinOffOutline.name, _IconPinOffOutline)
  },
})
