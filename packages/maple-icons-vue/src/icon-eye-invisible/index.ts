import type { App } from 'vue'
import _IconEyeInvisible from './icon-eye-invisible.vue'

export const IconEyeInvisible = Object.assign(_IconEyeInvisible, {
  install(app: App) { app.component(_IconEyeInvisible.name, _IconEyeInvisible) },
})
