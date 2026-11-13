import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChevronLeft from './icon-chevron-left.vue'

export const IconChevronLeft: IconComponent = Object.assign(_IconChevronLeft, {
  install(app: App) { app.component(_IconChevronLeft.name, _IconChevronLeft) },
})
