import type { App } from 'vue'
import _IconArrowRise from './icon-arrow-rise.vue'

export const IconArrowRise = Object.assign(_IconArrowRise, {
  install(app: App) {
    app.component(_IconArrowRise.name, _IconArrowRise)
  },
})
