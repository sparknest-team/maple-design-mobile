import type { App } from 'vue'
import _IconApps from './icon-apps.vue'

export const IconApps = Object.assign(_IconApps, {
  install(app: App) {
    app.component(_IconApps.name, _IconApps)
  },
})
