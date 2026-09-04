import type { App } from 'vue'
import _IconCopyright from './icon-copyright.vue'

export const IconCopyright = Object.assign(_IconCopyright, {
  install(app: App) {
    app.component(_IconCopyright.name, _IconCopyright)
  },
})
