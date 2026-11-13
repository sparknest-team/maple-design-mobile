import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFaceFrownFill from './icon-face-frown-fill.vue'

export const IconFaceFrownFill: IconComponent = Object.assign(_IconFaceFrownFill, {
  install(app: App) { app.component(_IconFaceFrownFill.name, _IconFaceFrownFill) },
})
