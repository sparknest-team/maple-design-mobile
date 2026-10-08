import type { App } from 'vue'
import _IconGoogle from './icon-google.vue'

export const IconGoogle = Object.assign(_IconGoogle, {
  install(app: App) { app.component(_IconGoogle.name, _IconGoogle) },
})
