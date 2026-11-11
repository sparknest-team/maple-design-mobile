import type { App } from 'vue'
import _IconSelectAll from './icon-select-all.vue'

export const IconSelectAll = Object.assign(_IconSelectAll, {
  install(app: App) { app.component(_IconSelectAll.name, _IconSelectAll) },
})
