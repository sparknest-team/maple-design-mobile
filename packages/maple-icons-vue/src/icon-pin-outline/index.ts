import type { App } from 'vue'
import _IconPinOutline from './icon-pin-outline.vue'

export const IconPinOutline = Object.assign(_IconPinOutline, {
  install(app: App) {
    app.component(_IconPinOutline.name, _IconPinOutline)
  },
})
