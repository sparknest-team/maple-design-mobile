import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExpand from './icon-expand.vue'

export const IconExpand: IconComponent = Object.assign(_IconExpand, {
  install(app: App) { app.component(_IconExpand.name, _IconExpand) },
})
