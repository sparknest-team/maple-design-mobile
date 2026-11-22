import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCopyright from './icon-copyright.vue'

export const IconCopyright: IconComponent = Object.assign(_IconCopyright, {
  install(app: App) { app.component(_IconCopyright.name!, _IconCopyright) },
})
