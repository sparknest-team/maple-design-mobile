import type { App } from 'vue'
import _IconMinusCircleFill from './icon-minus-circle-fill.vue'

export const IconMinusCircleFill = Object.assign(_IconMinusCircleFill, {
  install(app: App) {
    app.component(_IconMinusCircleFill.name, _IconMinusCircleFill)
  },
})
