import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDashboard from './icon-dashboard.vue'

export const IconDashboard: IconComponent = Object.assign(_IconDashboard, {
  install(app: App) { app.component(_IconDashboard.name, _IconDashboard) },
})
