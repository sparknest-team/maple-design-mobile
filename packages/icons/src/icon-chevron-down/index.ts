import type { App } from 'vue'
import _IconChevronDown from './icon-chevron-down.vue'

export const IconChevronDown = Object.assign(_IconChevronDown, {
  install(app: App) { app.component(_IconChevronDown.name, _IconChevronDown) },
})
