import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEye from './icon-eye.vue'

export const IconEye: IconComponent = Object.assign(_IconEye, {
  install(app: App) { app.component(_IconEye.name!, _IconEye) },
})
