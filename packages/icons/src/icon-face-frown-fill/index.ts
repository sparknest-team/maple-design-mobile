import type { App } from 'vue'
import _IconFaceFrownFill from './icon-face-frown-fill.vue'

export const IconFaceFrownFill = Object.assign(_IconFaceFrownFill, {
  install(app: App) { app.component(_IconFaceFrownFill.name, _IconFaceFrownFill) },
})
