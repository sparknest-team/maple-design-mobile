import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconZoomOut from './icon-zoom-out.vue'

export const IconZoomOut: IconComponent = Object.assign(_IconZoomOut, {
  install(app: App) { app.component(_IconZoomOut.name, _IconZoomOut) },
})
