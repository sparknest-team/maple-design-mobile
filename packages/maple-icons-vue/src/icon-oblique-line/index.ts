import type { App } from 'vue'
import _IconObliqueLine from './icon-oblique-line.vue'

export const IconObliqueLine = Object.assign(_IconObliqueLine, {
  install(app: App) {
    app.component(_IconObliqueLine.name, _IconObliqueLine)
  },
})
