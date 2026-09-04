import type { App } from 'vue'
import _IconPinFill from './icon-pin-fill.vue'

export const IconPinFill = Object.assign(_IconPinFill, {
  install(app: App) {
    app.component(_IconPinFill.name, _IconPinFill)
  },
})
