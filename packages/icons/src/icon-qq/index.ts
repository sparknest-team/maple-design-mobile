import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQq from './icon-qq.vue'

export const IconQq: IconComponent = Object.assign(_IconQq, {
  install(app: App) { app.component(_IconQq.name, _IconQq) },
})
