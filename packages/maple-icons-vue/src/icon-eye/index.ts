import type { App } from 'vue'
import _IconEye from './icon-eye.vue'

export const IconEye = Object.assign(_IconEye, {
  install(app: App) { app.component(_IconEye.name, _IconEye) },
})
