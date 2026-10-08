import type { App } from 'vue'
import _IconMinusBox from './icon-minus-box.vue'

export const IconMinusBox = Object.assign(_IconMinusBox, {
  install(app: App) { app.component(_IconMinusBox.name, _IconMinusBox) },
})
