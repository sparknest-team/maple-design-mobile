import type { App } from 'vue'
import _IconCodeJson from './icon-code-json.vue'

export const IconCodeJson = Object.assign(_IconCodeJson, {
  install(app: App) { app.component(_IconCodeJson.name, _IconCodeJson) },
})
