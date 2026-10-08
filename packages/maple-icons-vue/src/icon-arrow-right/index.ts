import type { App } from 'vue'
import _IconArrowRight from './icon-arrow-right.vue'

export const IconArrowRight = Object.assign(_IconArrowRight, {
  install(app: App) { app.component(_IconArrowRight.name, _IconArrowRight) },
})
