import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTiktokColor from './icon-tiktok-color.vue'

export const IconTiktokColor: IconComponent = Object.assign(_IconTiktokColor, {
  install(app: App) { app.component(_IconTiktokColor.name, _IconTiktokColor) },
})
