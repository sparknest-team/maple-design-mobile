import type { App } from 'vue'
import _IconEar from './icon-ear.vue'

export const IconEar = Object.assign(_IconEar, {
  install(app: App) {
    app.component(_IconEar.name, _IconEar)
  },
})
