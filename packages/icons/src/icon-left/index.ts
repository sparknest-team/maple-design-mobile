import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLeft from './icon-left.vue'

export const IconLeft: IconComponent = Object.assign(_IconLeft, {
  install(app: App) { app.component(_IconLeft.name!, _IconLeft) },
})
