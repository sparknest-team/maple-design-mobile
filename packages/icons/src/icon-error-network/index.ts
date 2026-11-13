import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconErrorNetwork from './icon-error-network.vue'

export const IconErrorNetwork: IconComponent = Object.assign(_IconErrorNetwork, {
  install(app: App) { app.component(_IconErrorNetwork.name, _IconErrorNetwork) },
})
