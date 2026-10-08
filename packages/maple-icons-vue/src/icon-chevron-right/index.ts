import type { App } from 'vue'
import _IconChevronRight from './icon-chevron-right.vue'

export const IconChevronRight = Object.assign(_IconChevronRight, {
  install(app: App) { app.component(_IconChevronRight.name, _IconChevronRight) },
})
