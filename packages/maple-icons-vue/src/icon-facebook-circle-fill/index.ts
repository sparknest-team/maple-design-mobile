import type { App } from 'vue'
import _IconFacebookCircleFill from './icon-facebook-circle-fill.vue'

export const IconFacebookCircleFill = Object.assign(_IconFacebookCircleFill, {
  install(app: App) { app.component(_IconFacebookCircleFill.name, _IconFacebookCircleFill) },
})
