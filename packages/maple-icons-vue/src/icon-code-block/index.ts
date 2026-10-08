import type { App } from 'vue'
import _IconCodeBlock from './icon-code-block.vue'

export const IconCodeBlock = Object.assign(_IconCodeBlock, {
  install(app: App) { app.component(_IconCodeBlock.name, _IconCodeBlock) },
})
