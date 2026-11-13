import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChevronDown from './icon-chevron-down.vue'

export const IconChevronDown: IconComponent = Object.assign(_IconChevronDown, {
  install(app: App) { app.component(_IconChevronDown.name, _IconChevronDown) },
})
