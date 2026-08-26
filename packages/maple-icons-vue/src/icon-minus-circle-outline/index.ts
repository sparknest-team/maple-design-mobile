import type { App } from 'vue'
import _IconMinusCircleOutline from './icon-minus-circle-outline.vue'

export const IconMinusCircleOutline = Object.assign(_IconMinusCircleOutline, {
  install(app: App) {
    app.component(_IconMinusCircleOutline.name, _IconMinusCircleOutline)
  },
})
