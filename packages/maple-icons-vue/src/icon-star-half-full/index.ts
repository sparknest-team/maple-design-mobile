import type { App } from 'vue'
import _IconStarHalfFull from './icon-star-half-full.vue'

export const IconStarHalfFull = Object.assign(_IconStarHalfFull, {
  install(app: App) {
    app.component(_IconStarHalfFull.name, _IconStarHalfFull)
  },
})
