import type { App } from 'vue'
import _IconMenu from './icon-menu.vue'

export const IconMenu = Object.assign(_IconMenu, {
  install(app: App) { app.component(_IconMenu.name, _IconMenu) },
})
