import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMindMapping from './icon-mind-mapping.vue'

export const IconMindMapping: IconComponent = Object.assign(_IconMindMapping, {
  install(app: App) { app.component(_IconMindMapping.name!, _IconMindMapping) },
})
