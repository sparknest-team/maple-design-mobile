import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowUp from './icon-arrow-up.vue'

export const IconArrowUp: IconComponent = Object.assign(_IconArrowUp, {
  install(app: App) { app.component(_IconArrowUp.name, _IconArrowUp) },
})
