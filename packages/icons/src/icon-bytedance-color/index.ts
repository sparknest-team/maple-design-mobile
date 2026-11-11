import type { App } from 'vue'
import _IconBytedanceColor from './icon-bytedance-color.vue'

export const IconBytedanceColor = Object.assign(_IconBytedanceColor, {
  install(app: App) { app.component(_IconBytedanceColor.name, _IconBytedanceColor) },
})
