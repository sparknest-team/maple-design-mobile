import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHistory from './icon-history.vue'

export const IconHistory: IconComponent = Object.assign(_IconHistory, {
  install(app: App) { app.component(_IconHistory.name, _IconHistory) },
})
