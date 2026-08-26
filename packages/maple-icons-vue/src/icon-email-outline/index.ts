import type { App } from 'vue'
import _IconEmailOutline from './icon-email-outline.vue'

export const IconEmailOutline = Object.assign(_IconEmailOutline, {
  install(app: App) {
    app.component(_IconEmailOutline.name, _IconEmailOutline)
  },
})
