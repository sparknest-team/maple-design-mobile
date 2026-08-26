import type { App } from 'vue'
import _IconThumbUp from './icon-thumb-up.vue'

export const IconThumbUp = Object.assign(_IconThumbUp, {
  install(app: App) {
    app.component(_IconThumbUp.name, _IconThumbUp)
  },
})
