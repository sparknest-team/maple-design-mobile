import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSearch from './icon-search.vue'

export const IconSearch: IconComponent = Object.assign(_IconSearch, {
  install(app: App) { app.component(_IconSearch.name, _IconSearch) },
})
