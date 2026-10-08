import type { App } from 'vue'
import _IconHeartHalfFull from './icon-heart-half-full.vue'

export const IconHeartHalfFull = Object.assign(_IconHeartHalfFull, {
  install(app: App) { app.component(_IconHeartHalfFull.name, _IconHeartHalfFull) },
})
