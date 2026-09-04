import type { App } from 'vue'
import _IconTiktokColor from './icon-tiktok-color.vue'

export const IconTiktokColor = Object.assign(_IconTiktokColor, {
  install(app: App) {
    app.component(_IconTiktokColor.name, _IconTiktokColor)
  },
})
