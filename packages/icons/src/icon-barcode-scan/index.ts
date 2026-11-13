import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBarcodeScan from './icon-barcode-scan.vue'

export const IconBarcodeScan: IconComponent = Object.assign(_IconBarcodeScan, {
  install(app: App) { app.component(_IconBarcodeScan.name, _IconBarcodeScan) },
})
