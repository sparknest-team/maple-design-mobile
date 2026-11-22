import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTool from './icon-tool.vue'

export const IconTool: IconComponent = Object.assign(_IconTool, {
  install(app: App) { app.component(_IconTool.name!, _IconTool) },
})
