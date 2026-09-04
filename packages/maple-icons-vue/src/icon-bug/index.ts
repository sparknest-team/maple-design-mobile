import type { App } from 'vue'
import _IconBug from './icon-bug.vue'

export const IconBug = Object.assign(_IconBug, {
  install(app: App) {
    app.component(_IconBug.name, _IconBug)
  },
})
