import type { App } from 'vue'
import _IconMagnifyPlusOutline from './icon-magnify-plus-outline.vue'

export const IconMagnifyPlusOutline = Object.assign(_IconMagnifyPlusOutline, {
  install(app: App) {
    app.component(_IconMagnifyPlusOutline.name, _IconMagnifyPlusOutline)
  },
})
