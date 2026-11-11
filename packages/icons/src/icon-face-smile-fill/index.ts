import type { App } from 'vue'
import _IconFaceSmileFill from './icon-face-smile-fill.vue'

export const IconFaceSmileFill = Object.assign(_IconFaceSmileFill, {
  install(app: App) { app.component(_IconFaceSmileFill.name, _IconFaceSmileFill) },
})
