import type { App } from 'vue'
import _IconWindowClose from './icon-window-close.vue'

export const IconWindowClose = Object.assign(_IconWindowClose, {
  install(app: App) {
    app.component(_IconWindowClose.name, _IconWindowClose)
  },
})
