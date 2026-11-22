import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLayers from './icon-layers.vue'

export const IconLayers: IconComponent = Object.assign(_IconLayers, {
  install(app: App) { app.component(_IconLayers.name!, _IconLayers) },
})
