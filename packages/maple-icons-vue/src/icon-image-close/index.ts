import type { App } from 'vue'
import _IconImageClose from './icon-image-close.vue'

export const IconImageClose = Object.assign(_IconImageClose, {
  install(app: App) {
    app.component(_IconImageClose.name, _IconImageClose)
  },
})
