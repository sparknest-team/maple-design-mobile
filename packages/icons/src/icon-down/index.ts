import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDown from './icon-down.vue'

export const IconDown: IconComponent = Object.assign(_IconDown, {
  install(app: App) { app.component(_IconDown.name!, _IconDown) },
})
