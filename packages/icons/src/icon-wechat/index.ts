import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWechat from './icon-wechat.vue'

export const IconWechat: IconComponent = Object.assign(_IconWechat, {
  install(app: App) { app.component(_IconWechat.name!, _IconWechat) },
})
