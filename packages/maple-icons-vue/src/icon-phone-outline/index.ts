import type { App } from 'vue'
import _IconPhoneOutline from './icon-phone-outline.vue'

export const IconPhoneOutline = Object.assign(_IconPhoneOutline, {
  install(app: App) {
    app.component(_IconPhoneOutline.name, _IconPhoneOutline)
  },
})
