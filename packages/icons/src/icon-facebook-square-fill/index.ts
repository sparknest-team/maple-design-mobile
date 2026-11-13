import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFacebookSquareFill from './icon-facebook-square-fill.vue'

export const IconFacebookSquareFill: IconComponent = Object.assign(_IconFacebookSquareFill, {
  install(app: App) { app.component(_IconFacebookSquareFill.name, _IconFacebookSquareFill) },
})
