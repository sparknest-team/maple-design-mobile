import type { App } from 'vue'
import _IconArrowUpBoldBox from './icon-arrow-up-bold-box.vue'

export const IconArrowUpBoldBox = Object.assign(_IconArrowUpBoldBox, {
  install(app: App) { app.component(_IconArrowUpBoldBox.name, _IconArrowUpBoldBox) },
})
