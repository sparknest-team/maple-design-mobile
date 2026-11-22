import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSortAscending from './icon-sort-ascending.vue'

export const IconSortAscending: IconComponent = Object.assign(_IconSortAscending, {
  install(app: App) { app.component(_IconSortAscending.name!, _IconSortAscending) },
})
