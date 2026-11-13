import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowUpBoldBoxFill from './icon-arrow-up-bold-box-fill.vue'

export const IconArrowUpBoldBoxFill: IconComponent = Object.assign(_IconArrowUpBoldBoxFill, {
  install(app: App) { app.component(_IconArrowUpBoldBoxFill.name, _IconArrowUpBoldBoxFill) },
})
