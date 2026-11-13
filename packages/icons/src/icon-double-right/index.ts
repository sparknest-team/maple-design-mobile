import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDoubleRight from './icon-double-right.vue'

export const IconDoubleRight: IconComponent = Object.assign(_IconDoubleRight, {
  install(app: App) { app.component(_IconDoubleRight.name, _IconDoubleRight) },
})
