import type { App } from 'vue'
import _IconCloud from './icon-cloud.vue'

export const IconCloud = Object.assign(_IconCloud, {
  install(app: App) {
    app.component(_IconCloud.name, _IconCloud)
  },
})
