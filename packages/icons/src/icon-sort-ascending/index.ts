import type { App } from 'vue'
import _IconSortAscending from './icon-sort-ascending.vue'

export const IconSortAscending = Object.assign(_IconSortAscending, {
  install(app: App) { app.component(_IconSortAscending.name, _IconSortAscending) },
})
