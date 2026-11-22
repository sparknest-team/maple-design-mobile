import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowFall from './icon-arrow-fall.vue'

export const IconArrowFall: IconComponent = Object.assign(_IconArrowFall, {
  install(app: App) { app.component(_IconArrowFall.name!, _IconArrowFall) },
})
