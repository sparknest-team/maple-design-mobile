import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFaceSmileFill from './icon-face-smile-fill.vue'

export const IconFaceSmileFill: IconComponent = Object.assign(_IconFaceSmileFill, {
  install(app: App) { app.component(_IconFaceSmileFill.name, _IconFaceSmileFill) },
})
