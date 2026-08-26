import type { App } from 'vue'
import _IconCloseBox from './icon-close-box.vue'

export const IconCloseBox = Object.assign(_IconCloseBox, {
  install(app: App) {
    app.component(_IconCloseBox.name, _IconCloseBox)
  },
})
