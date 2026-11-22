import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconApps from './icon-apps.vue'

export const IconApps: IconComponent = Object.assign(_IconApps, {
  install(app: App) { app.component(_IconApps.name!, _IconApps) },
})
