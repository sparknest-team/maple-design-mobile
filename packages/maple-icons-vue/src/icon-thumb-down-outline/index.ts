import type { App } from 'vue'
import _IconThumbDownOutline from './icon-thumb-down-outline.vue'

export const IconThumbDownOutline = Object.assign(_IconThumbDownOutline, {
  install(app: App) {
    app.component(_IconThumbDownOutline.name, _IconThumbDownOutline)
  },
})
