import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQqZone from './icon-qq-zone.vue'

export const IconQqZone: IconComponent = Object.assign(_IconQqZone, {
  install(app: App) { app.component(_IconQqZone.name, _IconQqZone) },
})
