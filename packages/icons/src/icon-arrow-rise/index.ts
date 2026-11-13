import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowRise from './icon-arrow-rise.vue'

export const IconArrowRise: IconComponent = Object.assign(_IconArrowRise, {
  install(app: App) { app.component(_IconArrowRise.name, _IconArrowRise) },
})
