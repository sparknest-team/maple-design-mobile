import type { App } from 'vue'
import _IconChevronUp from './icon-chevron-up.vue'

export const IconChevronUp = Object.assign(_IconChevronUp, {
  install(app: App) {
    app.component(_IconChevronUp.name, _IconChevronUp)
  },
})
