import type { App } from 'vue'
import _IconUpCircle from './icon-up-circle.vue'

export const IconUpCircle = Object.assign(_IconUpCircle, {
  install(app: App) { app.component(_IconUpCircle.name, _IconUpCircle) },
})
