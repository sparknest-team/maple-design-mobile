import type { App } from 'vue'
import _IconWeibo from './icon-weibo.vue'

export const IconWeibo = Object.assign(_IconWeibo, {
  install(app: App) {
    app.component(_IconWeibo.name, _IconWeibo)
  },
})
