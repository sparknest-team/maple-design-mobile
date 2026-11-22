import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconZoomInFill from './icon-zoom-in-fill.vue'

export const IconZoomInFill: IconComponent = Object.assign(_IconZoomInFill, {
  install(app: App) { app.component(_IconZoomInFill.name!, _IconZoomInFill) },
})
