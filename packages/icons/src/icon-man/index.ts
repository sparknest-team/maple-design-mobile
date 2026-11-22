import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMan from './icon-man.vue'

export const IconMan: IconComponent = Object.assign(_IconMan, {
  install(app: App) { app.component(_IconMan.name!, _IconMan) },
})
