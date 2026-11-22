import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEyeInvisible from './icon-eye-invisible.vue'

export const IconEyeInvisible: IconComponent = Object.assign(_IconEyeInvisible, {
  install(app: App) { app.component(_IconEyeInvisible.name!, _IconEyeInvisible) },
})
