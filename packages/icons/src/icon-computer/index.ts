import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconComputer from './icon-computer.vue'

export const IconComputer: IconComponent = Object.assign(_IconComputer, {
  install(app: App) { app.component(_IconComputer.name, _IconComputer) },
})
