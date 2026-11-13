import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconClose from './icon-close.vue'

export const IconClose: IconComponent = Object.assign(_IconClose, {
  install(app: App) { app.component(_IconClose.name, _IconClose) },
})
