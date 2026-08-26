import type { App } from 'vue'
import _IconMapMarkerRadius from './icon-map-marker-radius.vue'

export const IconMapMarkerRadius = Object.assign(_IconMapMarkerRadius, {
  install(app: App) {
    app.component(_IconMapMarkerRadius.name, _IconMapMarkerRadius)
  },
})
