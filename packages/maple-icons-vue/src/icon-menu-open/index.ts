import type { App } from 'vue'
import _IconMenuOpen from './icon-menu-open.vue'

export const IconMenuOpen = Object.assign(_IconMenuOpen, {
  install(app: App) {
    app.component(_IconMenuOpen.name, _IconMenuOpen)
  },
})
