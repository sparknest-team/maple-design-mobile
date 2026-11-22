import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeibo from './icon-weibo.vue'

export const IconWeibo: IconComponent = Object.assign(_IconWeibo, {
  install(app: App) { app.component(_IconWeibo.name!, _IconWeibo) },
})
