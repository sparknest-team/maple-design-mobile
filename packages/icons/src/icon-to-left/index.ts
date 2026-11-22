import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconToLeft from './icon-to-left.vue'

export const IconToLeft: IconComponent = Object.assign(_IconToLeft, {
  install(app: App) { app.component(_IconToLeft.name!, _IconToLeft) },
})
