import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTagFill from './icon-tag-fill.vue'

export const IconTagFill: IconComponent = Object.assign(_IconTagFill, {
  install(app: App) { app.component(_IconTagFill.name!, _IconTagFill) },
})
