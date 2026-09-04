import type { App } from 'vue'
import _IconMosaic from './icon-mosaic.vue'

export const IconMosaic = Object.assign(_IconMosaic, {
  install(app: App) {
    app.component(_IconMosaic.name, _IconMosaic)
  },
})
