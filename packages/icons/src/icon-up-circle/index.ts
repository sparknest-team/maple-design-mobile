import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUpCircle from './icon-up-circle.vue'

export const IconUpCircle: IconComponent = Object.assign(_IconUpCircle, {
  install(app: App) { app.component(_IconUpCircle.name!, _IconUpCircle) },
})
