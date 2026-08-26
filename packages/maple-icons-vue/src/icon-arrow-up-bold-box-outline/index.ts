import type { App } from 'vue'
import _IconArrowUpBoldBoxOutline from './icon-arrow-up-bold-box-outline.vue'

export const IconArrowUpBoldBoxOutline = Object.assign(_IconArrowUpBoldBoxOutline, {
  install(app: App) {
    app.component(_IconArrowUpBoldBoxOutline.name, _IconArrowUpBoldBoxOutline)
  },
})
