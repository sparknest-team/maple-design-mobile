import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconImageClose from './icon-image-close.vue'

export const IconImageClose: IconComponent = Object.assign(_IconImageClose, {
  install(app: App) { app.component(_IconImageClose.name, _IconImageClose) },
})
