import type { App } from 'vue'
import _IconZoomIn from './icon-zoom-in.vue'

export const IconZoomIn = Object.assign(_IconZoomIn, {
  install(app: App) { app.component(_IconZoomIn.name, _IconZoomIn) },
})
