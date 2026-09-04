import type { App } from 'vue'
import _IconInfo from './icon-info.vue'

export const IconInfo = Object.assign(_IconInfo, {
  install(app: App) {
    app.component(_IconInfo.name, _IconInfo)
  },
})
