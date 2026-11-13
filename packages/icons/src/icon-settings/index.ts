import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSettings from './icon-settings.vue'

export const IconSettings: IconComponent = Object.assign(_IconSettings, {
  install(app: App) { app.component(_IconSettings.name, _IconSettings) },
})
