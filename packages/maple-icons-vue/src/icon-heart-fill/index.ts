import type { App } from 'vue'
import _IconHeartFill from './icon-heart-fill.vue'

export const IconHeartFill = Object.assign(_IconHeartFill, {
  install(app: App) {
    app.component(_IconHeartFill.name, _IconHeartFill)
  },
})
