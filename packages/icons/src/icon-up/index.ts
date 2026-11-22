import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUp from './icon-up.vue'

export const IconUp: IconComponent = Object.assign(_IconUp, {
  install(app: App) { app.component(_IconUp.name!, _IconUp) },
})
