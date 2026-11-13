import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHeartFill from './icon-heart-fill.vue'

export const IconHeartFill: IconComponent = Object.assign(_IconHeartFill, {
  install(app: App) { app.component(_IconHeartFill.name, _IconHeartFill) },
})
