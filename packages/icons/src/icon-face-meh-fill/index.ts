import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFaceMehFill from './icon-face-meh-fill.vue'

export const IconFaceMehFill: IconComponent = Object.assign(_IconFaceMehFill, {
  install(app: App) { app.component(_IconFaceMehFill.name, _IconFaceMehFill) },
})
