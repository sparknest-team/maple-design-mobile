import type { App } from 'vue'
import _IconSettingsFill from './icon-settings-fill.vue'

export const IconSettingsFill = Object.assign(_IconSettingsFill, {
  install(app: App) { app.component(_IconSettingsFill.name, _IconSettingsFill) },
})
