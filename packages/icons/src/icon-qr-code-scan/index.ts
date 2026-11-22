import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQrCodeScan from './icon-qr-code-scan.vue'

export const IconQrCodeScan: IconComponent = Object.assign(_IconQrCodeScan, {
  install(app: App) { app.component(_IconQrCodeScan.name!, _IconQrCodeScan) },
})
