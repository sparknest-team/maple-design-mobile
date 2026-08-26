import type { App } from 'vue'
import _IconInformation from './icon-information.vue'

export const IconInformation = Object.assign(_IconInformation, {
  install(app: App) {
    app.component(_IconInformation.name, _IconInformation)
  },
})
