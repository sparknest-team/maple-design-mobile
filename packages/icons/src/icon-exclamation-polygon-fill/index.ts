import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExclamationPolygonFill from './icon-exclamation-polygon-fill.vue'

export const IconExclamationPolygonFill: IconComponent = Object.assign(_IconExclamationPolygonFill, {
  install(app: App) { app.component(_IconExclamationPolygonFill.name, _IconExclamationPolygonFill) },
})
