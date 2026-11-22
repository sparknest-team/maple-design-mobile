import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCodepen from './icon-codepen.vue'

export const IconCodepen: IconComponent = Object.assign(_IconCodepen, {
  install(app: App) { app.component(_IconCodepen.name!, _IconCodepen) },
})
