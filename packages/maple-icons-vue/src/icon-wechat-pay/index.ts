import type { App } from 'vue'
import _IconWechatPay from './icon-wechat-pay.vue'

export const IconWechatPay = Object.assign(_IconWechatPay, {
  install(app: App) { app.component(_IconWechatPay.name, _IconWechatPay) },
})
