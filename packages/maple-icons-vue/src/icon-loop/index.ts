import type { App } from 'vue'
import _IconLoop from './icon-loop.vue'

export const IconLoop = Object.assign(_IconLoop, {
  install(app: App) {
    app.component(_IconLoop.name, _IconLoop)
  },
})
