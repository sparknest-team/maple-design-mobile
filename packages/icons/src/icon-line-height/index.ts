import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLineHeight from './icon-line-height.vue'

export const IconLineHeight: IconComponent = Object.assign(_IconLineHeight, {
  install(app: App) { app.component(_IconLineHeight.name!, _IconLineHeight) },
})
