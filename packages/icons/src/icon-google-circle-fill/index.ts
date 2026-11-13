import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconGoogleCircleFill from './icon-google-circle-fill.vue'

export const IconGoogleCircleFill: IconComponent = Object.assign(_IconGoogleCircleFill, {
  install(app: App) { app.component(_IconGoogleCircleFill.name, _IconGoogleCircleFill) },
})
