import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconForward from './icon-forward.vue'

export const IconForward: IconComponent = Object.assign(_IconForward, {
  install(app: App) { app.component(_IconForward.name, _IconForward) },
})
