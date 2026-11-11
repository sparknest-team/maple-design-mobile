import type { App } from 'vue'
import _IconForward from './icon-forward.vue'

export const IconForward = Object.assign(_IconForward, {
  install(app: App) { app.component(_IconForward.name, _IconForward) },
})
