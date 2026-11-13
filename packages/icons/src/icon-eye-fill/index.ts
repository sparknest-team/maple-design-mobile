import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEyeFill from './icon-eye-fill.vue'

export const IconEyeFill: IconComponent = Object.assign(_IconEyeFill, {
  install(app: App) { app.component(_IconEyeFill.name, _IconEyeFill) },
})
