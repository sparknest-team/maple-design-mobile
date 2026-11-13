import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLayout from './icon-layout.vue'

export const IconLayout: IconComponent = Object.assign(_IconLayout, {
  install(app: App) { app.component(_IconLayout.name, _IconLayout) },
})
