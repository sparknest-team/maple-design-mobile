import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFacebook from './icon-facebook.vue'

export const IconFacebook: IconComponent = Object.assign(_IconFacebook, {
  install(app: App) { app.component(_IconFacebook.name!, _IconFacebook) },
})
