import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFileImage from './icon-file-image.vue'

export const IconFileImage: IconComponent = Object.assign(_IconFileImage, {
  install(app: App) { app.component(_IconFileImage.name, _IconFileImage) },
})
