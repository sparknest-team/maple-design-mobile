import type { App } from 'vue'
import _IconCodepen from './icon-codepen.vue'

export const IconCodepen = Object.assign(_IconCodepen, {
  install(app: App) {
    app.component(_IconCodepen.name, _IconCodepen)
  },
})
