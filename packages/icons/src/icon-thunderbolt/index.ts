import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconThunderbolt from './icon-thunderbolt.vue'

export const IconThunderbolt: IconComponent = Object.assign(_IconThunderbolt, {
  install(app: App) { app.component(_IconThunderbolt.name!, _IconThunderbolt) },
})
