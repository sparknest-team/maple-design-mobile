import type { App } from 'vue'
import _IconRefresh from './icon-refresh.vue'

export const IconRefresh = Object.assign(_IconRefresh, {
  install(app: App) { app.component(_IconRefresh.name, _IconRefresh) },
})
