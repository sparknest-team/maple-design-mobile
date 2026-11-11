import type { App } from 'vue'
import _IconImage from './icon-image.vue'

export const IconImage = Object.assign(_IconImage, {
  install(app: App) { app.component(_IconImage.name, _IconImage) },
})
