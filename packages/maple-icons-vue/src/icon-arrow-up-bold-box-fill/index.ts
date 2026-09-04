import type { App } from 'vue'
import _IconArrowUpBoldBoxFill from './icon-arrow-up-bold-box-fill.vue'

export const IconArrowUpBoldBoxFill = Object.assign(_IconArrowUpBoldBoxFill, {
  install(app: App) {
    app.component(_IconArrowUpBoldBoxFill.name, _IconArrowUpBoldBoxFill)
  },
})
