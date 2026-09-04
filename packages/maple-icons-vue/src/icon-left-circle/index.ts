import type { App } from 'vue'
import _IconLeftCircle from './icon-left-circle.vue'

export const IconLeftCircle = Object.assign(_IconLeftCircle, {
  install(app: App) {
    app.component(_IconLeftCircle.name, _IconLeftCircle)
  },
})
