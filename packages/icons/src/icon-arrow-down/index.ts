import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowDown from './icon-arrow-down.vue'

export const IconArrowDown: IconComponent = Object.assign(_IconArrowDown, {
  install(app: App) { app.component(_IconArrowDown.name, _IconArrowDown) },
})
