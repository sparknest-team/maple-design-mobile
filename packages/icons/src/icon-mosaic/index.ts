import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMosaic from './icon-mosaic.vue'

export const IconMosaic: IconComponent = Object.assign(_IconMosaic, {
  install(app: App) { app.component(_IconMosaic.name!, _IconMosaic) },
})
