import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSort from './icon-sort.vue'

export const IconSort: IconComponent = Object.assign(_IconSort, {
  install(app: App) { app.component(_IconSort.name!, _IconSort) },
})
