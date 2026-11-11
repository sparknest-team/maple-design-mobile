import type { App } from 'vue'
import _IconTagFill from './icon-tag-fill.vue'

export const IconTagFill = Object.assign(_IconTagFill, {
  install(app: App) { app.component(_IconTagFill.name, _IconTagFill) },
})
