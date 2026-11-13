import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconScan from './icon-scan.vue'

export const IconScan: IconComponent = Object.assign(_IconScan, {
  install(app: App) { app.component(_IconScan.name, _IconScan) },
})
