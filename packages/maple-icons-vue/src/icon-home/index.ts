import type { App } from 'vue'
import _IconHome from './icon-home.vue'

export const IconHome = Object.assign(_IconHome, {
  install(app: App) {
    app.component(_IconHome.name, _IconHome)
  },
})
