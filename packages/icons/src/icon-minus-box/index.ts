import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMinusBox from './icon-minus-box.vue'

export const IconMinusBox: IconComponent = Object.assign(_IconMinusBox, {
  install(app: App) { app.component(_IconMinusBox.name!, _IconMinusBox) },
})
