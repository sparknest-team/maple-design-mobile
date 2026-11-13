import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenu from './icon-menu.vue'

export const IconMenu: IconComponent = Object.assign(_IconMenu, {
  install(app: App) { app.component(_IconMenu.name, _IconMenu) },
})
