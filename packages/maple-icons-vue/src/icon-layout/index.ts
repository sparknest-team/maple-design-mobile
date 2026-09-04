import type { App } from 'vue'
import _IconLayout from './icon-layout.vue'

export const IconLayout = Object.assign(_IconLayout, {
  install(app: App) {
    app.component(_IconLayout.name, _IconLayout)
  },
})
