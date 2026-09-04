import type { App } from 'vue'
import _IconLarkColor from './icon-lark-color.vue'

export const IconLarkColor = Object.assign(_IconLarkColor, {
  install(app: App) {
    app.component(_IconLarkColor.name, _IconLarkColor)
  },
})
