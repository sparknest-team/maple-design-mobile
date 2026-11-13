import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconZoomOutFill from './icon-zoom-out-fill.vue'

export const IconZoomOutFill: IconComponent = Object.assign(_IconZoomOutFill, {
  install(app: App) { app.component(_IconZoomOutFill.name, _IconZoomOutFill) },
})
