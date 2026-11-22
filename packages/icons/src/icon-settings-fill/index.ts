import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSettingsFill from './icon-settings-fill.vue'

export const IconSettingsFill: IconComponent = Object.assign(_IconSettingsFill, {
  install(app: App) { app.component(_IconSettingsFill.name!, _IconSettingsFill) },
})
