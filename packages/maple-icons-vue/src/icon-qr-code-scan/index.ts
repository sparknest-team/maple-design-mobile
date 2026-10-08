import type { App } from 'vue'
import _IconQrCodeScan from './icon-qr-code-scan.vue'

export const IconQrCodeScan = Object.assign(_IconQrCodeScan, {
  install(app: App) { app.component(_IconQrCodeScan.name, _IconQrCodeScan) },
})
