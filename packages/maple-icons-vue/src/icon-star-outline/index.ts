import type { App } from 'vue'
import _IconStarOutline from './icon-star-outline.vue'

export const IconStarOutline = Object.assign(_IconStarOutline, {
  install(app: App) {
    app.component(_IconStarOutline.name, _IconStarOutline)
  },
})
