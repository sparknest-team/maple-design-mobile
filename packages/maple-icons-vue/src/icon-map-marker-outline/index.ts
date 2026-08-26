import type { App } from 'vue'
import _IconMapMarkerOutline from './icon-map-marker-outline.vue'

export const IconMapMarkerOutline = Object.assign(_IconMapMarkerOutline, {
  install(app: App) {
    app.component(_IconMapMarkerOutline.name, _IconMapMarkerOutline)
  },
})
