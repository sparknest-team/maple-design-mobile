import type { App } from 'vue'
import _IconQqCircleFill from './icon-qq-circle-fill.vue'

export const IconQqCircleFill = Object.assign(_IconQqCircleFill, {
  install(app: App) {
    app.component(_IconQqCircleFill.name, _IconQqCircleFill)
  },
})
