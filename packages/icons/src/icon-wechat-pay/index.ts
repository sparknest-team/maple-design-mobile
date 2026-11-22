import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWechatPay from './icon-wechat-pay.vue'

export const IconWechatPay: IconComponent = Object.assign(_IconWechatPay, {
  install(app: App) { app.component(_IconWechatPay.name!, _IconWechatPay) },
})
