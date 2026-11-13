import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBytedanceColor from './icon-bytedance-color.vue'

export const IconBytedanceColor: IconComponent = Object.assign(_IconBytedanceColor, {
  install(app: App) { app.component(_IconBytedanceColor.name, _IconBytedanceColor) },
})
