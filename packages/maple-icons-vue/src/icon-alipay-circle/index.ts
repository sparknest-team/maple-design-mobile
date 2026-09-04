import type { App } from 'vue'
import _IconAlipayCircle from './icon-alipay-circle.vue'

export const IconAlipayCircle = Object.assign(_IconAlipayCircle, {
  install(app: App) {
    app.component(_IconAlipayCircle.name, _IconAlipayCircle)
  },
})
