import type { App } from 'vue'
import _IconThumbDownFill from './icon-thumb-down-fill.vue'

export const IconThumbDownFill = Object.assign(_IconThumbDownFill, {
  install(app: App) {
    app.component(_IconThumbDownFill.name, _IconThumbDownFill)
  },
})
