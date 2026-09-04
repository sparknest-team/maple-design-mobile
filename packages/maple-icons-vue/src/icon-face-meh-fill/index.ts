import type { App } from 'vue'
import _IconFaceMehFill from './icon-face-meh-fill.vue'

export const IconFaceMehFill = Object.assign(_IconFaceMehFill, {
  install(app: App) {
    app.component(_IconFaceMehFill.name, _IconFaceMehFill)
  },
})
