import type { App } from 'vue'
import _IconSort from './icon-sort.vue'

export const IconSort = Object.assign(_IconSort, {
  install(app: App) { app.component(_IconSort.name, _IconSort) },
})
