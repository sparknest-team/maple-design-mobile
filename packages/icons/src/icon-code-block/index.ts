import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCodeBlock from './icon-code-block.vue'

export const IconCodeBlock: IconComponent = Object.assign(_IconCodeBlock, {
  install(app: App) { app.component(_IconCodeBlock.name, _IconCodeBlock) },
})
