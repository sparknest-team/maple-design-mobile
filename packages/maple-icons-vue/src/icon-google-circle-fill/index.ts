import type { App } from 'vue'
import _IconGoogleCircleFill from './icon-google-circle-fill.vue'

export const IconGoogleCircleFill = Object.assign(_IconGoogleCircleFill, {
  install(app: App) {
    app.component(_IconGoogleCircleFill.name, _IconGoogleCircleFill)
  },
})
