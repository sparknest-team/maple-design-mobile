import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconQrCode from './icon-qr-code.vue'

export const IconQrCode: IconComponent = Object.assign(_IconQrCode, {
  install(app: App) { app.component(_IconQrCode.name!, _IconQrCode) },
})
