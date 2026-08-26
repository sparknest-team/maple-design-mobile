import type { App } from 'vue'
import _IconView from './icon-view.vue'

export const IconView = Object.assign(_IconView, {
  install(app: App) {
    app.component(_IconView.name, _IconView)
  },
})
