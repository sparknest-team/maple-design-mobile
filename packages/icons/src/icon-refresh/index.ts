import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRefresh from './icon-refresh.vue'

export const IconRefresh: IconComponent = Object.assign(_IconRefresh, {
  install(app: App) { app.component(_IconRefresh.name!, _IconRefresh) },
})
