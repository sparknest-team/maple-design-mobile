import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlignLeft from './icon-align-left.vue'

export const IconAlignLeft: IconComponent = Object.assign(_IconAlignLeft, {
  install(app: App) { app.component(_IconAlignLeft.name, _IconAlignLeft) },
})
