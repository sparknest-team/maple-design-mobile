import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCodeJson from './icon-code-json.vue'

export const IconCodeJson: IconComponent = Object.assign(_IconCodeJson, {
  install(app: App) { app.component(_IconCodeJson.name!, _IconCodeJson) },
})
