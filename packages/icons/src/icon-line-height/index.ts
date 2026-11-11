import type { App } from 'vue'
import _IconLineHeight from './icon-line-height.vue'

export const IconLineHeight = Object.assign(_IconLineHeight, {
  install(app: App) { app.component(_IconLineHeight.name, _IconLineHeight) },
})
