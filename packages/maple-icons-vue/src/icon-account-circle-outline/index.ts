import type { App } from 'vue'
import _IconAccountCircleOutline from './icon-account-circle-outline.vue'

export const IconAccountCircleOutline = Object.assign(_IconAccountCircleOutline, {
  install(app: App) {
    app.component(_IconAccountCircleOutline.name, _IconAccountCircleOutline)
  },
})
