import type { App } from 'vue'
import _IconChevronLeft from './icon-chevron-left.vue'

export const IconChevronLeft = Object.assign(_IconChevronLeft, {
  install(app: App) { app.component(_IconChevronLeft.name, _IconChevronLeft) },
})
