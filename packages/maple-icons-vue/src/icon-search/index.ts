import type { App } from 'vue'
import _IconSearch from './icon-search.vue'

export const IconSearch = Object.assign(_IconSearch, {
  install(app: App) {
    app.component(_IconSearch.name, _IconSearch)
  },
})
