import type { App } from 'vue'
import _IconComputer from './icon-computer.vue'

export const IconComputer = Object.assign(_IconComputer, {
  install(app: App) { app.component(_IconComputer.name, _IconComputer) },
})
