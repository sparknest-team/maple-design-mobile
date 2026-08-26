import type { App } from 'vue'
import _IconImageOutline from './icon-image-outline.vue'

export const IconImageOutline = Object.assign(_IconImageOutline, {
  install(app: App) {
    app.component(_IconImageOutline.name, _IconImageOutline)
  },
})
