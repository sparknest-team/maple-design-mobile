import type { App } from 'vue'
import _IconThumbUpOutline from './icon-thumb-up-outline.vue'

export const IconThumbUpOutline = Object.assign(_IconThumbUpOutline, {
  install(app: App) {
    app.component(_IconThumbUpOutline.name, _IconThumbUpOutline)
  },
})
