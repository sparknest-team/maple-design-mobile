import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRotateLeft from './icon-rotate-left.vue'

export const IconRotateLeft: IconComponent = Object.assign(_IconRotateLeft, {
  install(app: App) { app.component(_IconRotateLeft.name, _IconRotateLeft) },
})
