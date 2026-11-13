import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCloseBox from './icon-close-box.vue'

export const IconCloseBox: IconComponent = Object.assign(_IconCloseBox, {
  install(app: App) { app.component(_IconCloseBox.name, _IconCloseBox) },
})
