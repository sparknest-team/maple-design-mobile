import type { App } from 'vue'
import _IconLocation from './icon-location.vue'

export const IconLocation = Object.assign(_IconLocation, {
  install(app: App) {
    app.component(_IconLocation.name, _IconLocation)
  },
})
