import type { App } from 'vue'
import _IconMapMarker from './icon-map-marker.vue'

export const IconMapMarker = Object.assign(_IconMapMarker, {
  install(app: App) {
    app.component(_IconMapMarker.name, _IconMapMarker)
  },
})
