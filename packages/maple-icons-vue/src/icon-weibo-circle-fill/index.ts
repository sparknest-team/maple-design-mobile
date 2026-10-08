import type { App } from 'vue'
import _IconWeiboCircleFill from './icon-weibo-circle-fill.vue'

export const IconWeiboCircleFill = Object.assign(_IconWeiboCircleFill, {
  install(app: App) { app.component(_IconWeiboCircleFill.name, _IconWeiboCircleFill) },
})
