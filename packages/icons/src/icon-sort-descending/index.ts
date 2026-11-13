import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSortDescending from './icon-sort-descending.vue'

export const IconSortDescending: IconComponent = Object.assign(_IconSortDescending, {
  install(app: App) { app.component(_IconSortDescending.name, _IconSortDescending) },
})
