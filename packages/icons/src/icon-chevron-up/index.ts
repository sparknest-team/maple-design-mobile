import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChevronUp from './icon-chevron-up.vue'

export const IconChevronUp: IconComponent = Object.assign(_IconChevronUp, {
  install(app: App) { app.component(_IconChevronUp.name, _IconChevronUp) },
})
