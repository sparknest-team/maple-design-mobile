import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconInfo from './icon-info.vue'

export const IconInfo: IconComponent = Object.assign(_IconInfo, {
  install(app: App) { app.component(_IconInfo.name, _IconInfo) },
})
