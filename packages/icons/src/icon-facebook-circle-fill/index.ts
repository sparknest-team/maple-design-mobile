import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFacebookCircleFill from './icon-facebook-circle-fill.vue'

export const IconFacebookCircleFill: IconComponent = Object.assign(_IconFacebookCircleFill, {
  install(app: App) { app.component(_IconFacebookCircleFill.name!, _IconFacebookCircleFill) },
})
