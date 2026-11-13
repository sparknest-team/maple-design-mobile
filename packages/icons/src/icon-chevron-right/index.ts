import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChevronRight from './icon-chevron-right.vue'

export const IconChevronRight: IconComponent = Object.assign(_IconChevronRight, {
  install(app: App) { app.component(_IconChevronRight.name, _IconChevronRight) },
})
