import type { App } from 'vue'
import _IconTagOutline from './icon-tag-outline.vue'

export const IconTagOutline = Object.assign(_IconTagOutline, {
  install(app: App) {
    app.component(_IconTagOutline.name, _IconTagOutline)
  },
})
