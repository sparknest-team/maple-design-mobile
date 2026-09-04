import type { App } from 'vue'
import _IconErrorNetwork from './icon-error-network.vue'

export const IconErrorNetwork = Object.assign(_IconErrorNetwork, {
  install(app: App) {
    app.component(_IconErrorNetwork.name, _IconErrorNetwork)
  },
})
