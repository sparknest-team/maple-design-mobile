import type { App } from 'vue'
import _IconQrCode from './icon-qr-code.vue'

export const IconQrCode = Object.assign(_IconQrCode, {
  install(app: App) {
    app.component(_IconQrCode.name, _IconQrCode)
  },
})
