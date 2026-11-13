import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSelectAll from './icon-select-all.vue'

export const IconSelectAll: IconComponent = Object.assign(_IconSelectAll, {
  install(app: App) { app.component(_IconSelectAll.name, _IconSelectAll) },
})
