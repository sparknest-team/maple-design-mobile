import type { App } from 'vue'
import _IconQqZone from './icon-qq-zone.vue'

export const IconQqZone = Object.assign(_IconQqZone, {
  install(app: App) { app.component(_IconQqZone.name, _IconQqZone) },
})
