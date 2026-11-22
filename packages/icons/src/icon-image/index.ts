import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconImage from './icon-image.vue'

export const IconImage: IconComponent = Object.assign(_IconImage, {
  install(app: App) { app.component(_IconImage.name!, _IconImage) },
})
