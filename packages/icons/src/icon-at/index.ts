import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAt from './icon-at.vue'

export const IconAt: IconComponent = Object.assign(_IconAt, {
  install(app: App) { app.component(_IconAt.name, _IconAt) },
})
