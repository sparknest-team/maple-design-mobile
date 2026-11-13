import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRight from './icon-right.vue'

export const IconRight: IconComponent = Object.assign(_IconRight, {
  install(app: App) { app.component(_IconRight.name, _IconRight) },
})
