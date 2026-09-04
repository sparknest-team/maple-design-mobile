import type { App } from 'vue'
import _IconBulb from './icon-bulb.vue'

export const IconBulb = Object.assign(_IconBulb, {
  install(app: App) {
    app.component(_IconBulb.name, _IconBulb)
  },
})
