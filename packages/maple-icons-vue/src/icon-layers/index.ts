import type { App } from 'vue'
import _IconLayers from './icon-layers.vue'

export const IconLayers = Object.assign(_IconLayers, {
  install(app: App) {
    app.component(_IconLayers.name, _IconLayers)
  },
})
