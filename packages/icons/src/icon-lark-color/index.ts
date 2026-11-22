import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLarkColor from './icon-lark-color.vue'

export const IconLarkColor: IconComponent = Object.assign(_IconLarkColor, {
  install(app: App) { app.component(_IconLarkColor.name!, _IconLarkColor) },
})
