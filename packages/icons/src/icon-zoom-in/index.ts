import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconZoomIn from './icon-zoom-in.vue'

export const IconZoomIn: IconComponent = Object.assign(_IconZoomIn, {
  install(app: App) { app.component(_IconZoomIn.name!, _IconZoomIn) },
})
