import type { App } from 'vue'
import _IconQrcodeScan from './icon-qrcode-scan.vue'

export const IconQrcodeScan = Object.assign(_IconQrcodeScan, {
  install(app: App) {
    app.component(_IconQrcodeScan.name, _IconQrcodeScan)
  },
})
