import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconChineseFill from './icon-chinese-fill.vue'

export const IconChineseFill: IconComponent = Object.assign(_IconChineseFill, {
  install(app: App) { app.component(_IconChineseFill.name!, _IconChineseFill) },
})
