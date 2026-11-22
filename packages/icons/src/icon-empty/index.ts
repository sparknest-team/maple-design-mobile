import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEmpty from './icon-empty.vue'

export const IconEmpty: IconComponent = Object.assign(_IconEmpty, {
  install(app: App) { app.component(_IconEmpty.name!, _IconEmpty) },
})
