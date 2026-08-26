import type { App } from 'vue'
import _IconShareOutline from './icon-share-outline.vue'

export const IconShareOutline = Object.assign(_IconShareOutline, {
  install(app: App) {
    app.component(_IconShareOutline.name, _IconShareOutline)
  },
})
