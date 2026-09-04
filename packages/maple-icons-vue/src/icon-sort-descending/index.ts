import type { App } from 'vue'
import _IconSortDescending from './icon-sort-descending.vue'

export const IconSortDescending = Object.assign(_IconSortDescending, {
  install(app: App) {
    app.component(_IconSortDescending.name, _IconSortDescending)
  },
})
