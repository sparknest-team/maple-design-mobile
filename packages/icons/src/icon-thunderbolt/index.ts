import type { App } from 'vue'
import _IconThunderbolt from './icon-thunderbolt.vue'

export const IconThunderbolt = Object.assign(_IconThunderbolt, {
  install(app: App) { app.component(_IconThunderbolt.name, _IconThunderbolt) },
})
