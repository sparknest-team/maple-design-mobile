import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStarHalfFull from './icon-star-half-full.vue'

export const IconStarHalfFull: IconComponent = Object.assign(_IconStarHalfFull, {
  install(app: App) { app.component(_IconStarHalfFull.name, _IconStarHalfFull) },
})
