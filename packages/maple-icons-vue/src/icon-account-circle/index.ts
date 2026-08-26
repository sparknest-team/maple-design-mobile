import type { App } from 'vue'
import _IconAccountCircle from './icon-account-circle.vue'

export const IconAccountCircle = Object.assign(_IconAccountCircle, {
  install(app: App) {
    app.component(_IconAccountCircle.name, _IconAccountCircle)
  },
})
