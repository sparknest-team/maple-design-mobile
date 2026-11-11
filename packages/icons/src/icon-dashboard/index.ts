import type { App } from 'vue'
import _IconDashboard from './icon-dashboard.vue'

export const IconDashboard = Object.assign(_IconDashboard, {
  install(app: App) { app.component(_IconDashboard.name, _IconDashboard) },
})
