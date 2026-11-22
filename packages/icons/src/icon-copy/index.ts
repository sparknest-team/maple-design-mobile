import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCopy from './icon-copy.vue'

export const IconCopy: IconComponent = Object.assign(_IconCopy, {
  install(app: App) { app.component(_IconCopy.name!, _IconCopy) },
})
