import type { App } from 'vue'
import _IconBarcodeScan from './icon-barcode-scan.vue'

export const IconBarcodeScan = Object.assign(_IconBarcodeScan, {
  install(app: App) { app.component(_IconBarcodeScan.name, _IconBarcodeScan) },
})
