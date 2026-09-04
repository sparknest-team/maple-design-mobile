import type { App } from 'vue'
import _IconPauseCircle from './icon-pause-circle.vue'

export const IconPauseCircle = Object.assign(_IconPauseCircle, {
  install(app: App) {
    app.component(_IconPauseCircle.name, _IconPauseCircle)
  },
})
