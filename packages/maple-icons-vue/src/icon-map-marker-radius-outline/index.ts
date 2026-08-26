import type { App } from 'vue'
import _IconMapMarkerRadiusOutline from './icon-map-marker-radius-outline.vue'

export const IconMapMarkerRadiusOutline = Object.assign(_IconMapMarkerRadiusOutline, {
  install(app: App) {
    app.component(_IconMapMarkerRadiusOutline.name, _IconMapMarkerRadiusOutline)
  },
})
