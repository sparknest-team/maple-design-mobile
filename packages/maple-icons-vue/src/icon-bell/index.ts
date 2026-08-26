import type { App } from 'vue'
import _IconBell from './icon-bell.vue'

export const IconBell = Object.assign(_IconBell, {
  install(app: App) {
    app.component(_IconBell.name, _IconBell)
  },
})
