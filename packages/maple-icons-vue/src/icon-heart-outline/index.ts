import type { App } from 'vue'
import _IconHeartOutline from './icon-heart-outline.vue'

export const IconHeartOutline = Object.assign(_IconHeartOutline, {
  install(app: App) {
    app.component(_IconHeartOutline.name, _IconHeartOutline)
  },
})
