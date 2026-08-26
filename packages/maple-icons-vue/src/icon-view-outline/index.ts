import type { App } from 'vue'
import _IconViewOutline from './icon-view-outline.vue'

export const IconViewOutline = Object.assign(_IconViewOutline, {
  install(app: App) {
    app.component(_IconViewOutline.name, _IconViewOutline)
  },
})
