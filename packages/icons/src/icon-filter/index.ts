import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFilter from './icon-filter.vue'

export const IconFilter: IconComponent = Object.assign(_IconFilter, {
  install(app: App) { app.component(_IconFilter.name, _IconFilter) },
})
