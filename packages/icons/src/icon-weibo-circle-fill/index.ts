import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeiboCircleFill from './icon-weibo-circle-fill.vue'

export const IconWeiboCircleFill: IconComponent = Object.assign(_IconWeiboCircleFill, {
  install(app: App) { app.component(_IconWeiboCircleFill.name, _IconWeiboCircleFill) },
})
