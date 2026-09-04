import type { App } from 'vue'
import _IconChineseFill from './icon-chinese-fill.vue'

export const IconChineseFill = Object.assign(_IconChineseFill, {
  install(app: App) {
    app.component(_IconChineseFill.name, _IconChineseFill)
  },
})
