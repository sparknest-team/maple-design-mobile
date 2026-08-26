import type { App } from 'vue'
import _IconHomeOutline from './icon-home-outline.vue'

export const IconHomeOutline = Object.assign(_IconHomeOutline, {
  install(app: App) {
    app.component(_IconHomeOutline.name, _IconHomeOutline)
  },
})
