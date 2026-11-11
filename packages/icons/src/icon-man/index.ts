import type { App } from 'vue'
import _IconMan from './icon-man.vue'

export const IconMan = Object.assign(_IconMan, {
  install(app: App) { app.component(_IconMan.name, _IconMan) },
})
