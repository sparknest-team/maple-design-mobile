import type { App } from 'vue'
import _IconFileImage from './icon-file-image.vue'

export const IconFileImage = Object.assign(_IconFileImage, {
  install(app: App) {
    app.component(_IconFileImage.name, _IconFileImage)
  },
})
