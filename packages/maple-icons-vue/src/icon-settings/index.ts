import type { App } from 'vue'
import _IconSettings from './icon-settings.vue'

export const IconSettings = Object.assign(_IconSettings, {
  install(app: App) { app.component(_IconSettings.name, _IconSettings) },
})
