import type { App } from 'vue'
import _IconOriginalSize from './icon-original-size.vue'

export const IconOriginalSize = Object.assign(_IconOriginalSize, {
  install(app: App) { app.component(_IconOriginalSize.name, _IconOriginalSize) },
})
