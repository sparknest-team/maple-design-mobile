import type { App } from 'vue'
import _IconStop from './icon-stop.vue'

export const IconStop = Object.assign(_IconStop, {
  install(app: App) {
    app.component(_IconStop.name, _IconStop)
  },
})
