import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlignCenter from './icon-align-center.vue'

export const IconAlignCenter: IconComponent = Object.assign(_IconAlignCenter, {
  install(app: App) { app.component(_IconAlignCenter.name, _IconAlignCenter) },
})
