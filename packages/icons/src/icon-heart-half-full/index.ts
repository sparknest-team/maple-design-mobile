import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHeartHalfFull from './icon-heart-half-full.vue'

export const IconHeartHalfFull: IconComponent = Object.assign(_IconHeartHalfFull, {
  install(app: App) { app.component(_IconHeartHalfFull.name!, _IconHeartHalfFull) },
})
