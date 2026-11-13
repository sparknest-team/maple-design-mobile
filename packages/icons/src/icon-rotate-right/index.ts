import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRotateRight from './icon-rotate-right.vue'

export const IconRotateRight: IconComponent = Object.assign(_IconRotateRight, {
  install(app: App) { app.component(_IconRotateRight.name, _IconRotateRight) },
})
