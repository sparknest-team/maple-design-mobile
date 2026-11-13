import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconAlipayCircle from './icon-alipay-circle.vue'

export const IconAlipayCircle: IconComponent = Object.assign(_IconAlipayCircle, {
  install(app: App) { app.component(_IconAlipayCircle.name, _IconAlipayCircle) },
})
