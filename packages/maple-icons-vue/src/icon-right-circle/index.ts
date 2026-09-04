import type { App } from 'vue'
import _IconRightCircle from './icon-right-circle.vue'

export const IconRightCircle = Object.assign(_IconRightCircle, {
  install(app: App) {
    app.component(_IconRightCircle.name, _IconRightCircle)
  },
})
