import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlignRight from './icon-align-right.vue'

export const IconAlignRight: IconComponent = Object.assign(_IconAlignRight, {
  install(app: App) { app.component(_IconAlignRight.name, _IconAlignRight) },
})
