import type { App } from 'vue'
import _IconArrowFall from './icon-arrow-fall.vue'

export const IconArrowFall = Object.assign(_IconArrowFall, {
  install(app: App) {
    app.component(_IconArrowFall.name, _IconArrowFall)
  },
})
