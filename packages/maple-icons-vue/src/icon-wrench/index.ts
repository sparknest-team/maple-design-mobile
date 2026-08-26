import type { App } from 'vue'
import _IconWrench from './icon-wrench.vue'

export const IconWrench = Object.assign(_IconWrench, {
  install(app: App) {
    app.component(_IconWrench.name, _IconWrench)
  },
})
