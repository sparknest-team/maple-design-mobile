import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconArrowLeft from './icon-arrow-left.vue'

export const IconArrowLeft: IconComponent = Object.assign(_IconArrowLeft, {
  install(app: App) { app.component(_IconArrowLeft.name!, _IconArrowLeft) },
})
