import type { App } from 'vue'
import _IconDesktop from './icon-desktop.vue'

export const IconDesktop = Object.assign(_IconDesktop, {
  install(app: App) {
    app.component(_IconDesktop.name, _IconDesktop)
  },
})
