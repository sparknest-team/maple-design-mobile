import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconEar from './icon-ear.vue'

export const IconEar: IconComponent = Object.assign(_IconEar, {
  install(app: App) { app.component(_IconEar.name, _IconEar) },
})
