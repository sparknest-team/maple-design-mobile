import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowRight from './icon-arrow-right.vue'

export const IconArrowRight: IconComponent = Object.assign(_IconArrowRight, {
  install(app: App) { app.component(_IconArrowRight.name, _IconArrowRight) },
})
