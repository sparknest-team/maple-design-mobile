import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMenuUnfold from './icon-menu-unfold.vue'

export const IconMenuUnfold: IconComponent = Object.assign(_IconMenuUnfold, {
  install(app: App) { app.component(_IconMenuUnfold.name, _IconMenuUnfold) },
})
