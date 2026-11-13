import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowUpBoldBox from './icon-arrow-up-bold-box.vue'

export const IconArrowUpBoldBox: IconComponent = Object.assign(_IconArrowUpBoldBox, {
  install(app: App) { app.component(_IconArrowUpBoldBox.name, _IconArrowUpBoldBox) },
})
