import type { App } from 'vue'
import _IconExclamationPolygonFill from './icon-exclamation-polygon-fill.vue'

export const IconExclamationPolygonFill = Object.assign(_IconExclamationPolygonFill, {
  install(app: App) { app.component(_IconExclamationPolygonFill.name, _IconExclamationPolygonFill) },
})
