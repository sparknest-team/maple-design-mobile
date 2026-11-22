import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuOpen from './icon-menu-open.vue'

export const IconMenuOpen: IconComponent = Object.assign(_IconMenuOpen, {
  install(app: App) { app.component(_IconMenuOpen.name!, _IconMenuOpen) },
})
