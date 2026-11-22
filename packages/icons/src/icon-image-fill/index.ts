import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconImageFill from './icon-image-fill.vue'

export const IconImageFill: IconComponent = Object.assign(_IconImageFill, {
  install(app: App) { app.component(_IconImageFill.name!, _IconImageFill) },
})
