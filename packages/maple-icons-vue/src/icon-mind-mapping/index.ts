import type { App } from 'vue'
import _IconMindMapping from './icon-mind-mapping.vue'

export const IconMindMapping = Object.assign(_IconMindMapping, {
  install(app: App) { app.component(_IconMindMapping.name, _IconMindMapping) },
})
