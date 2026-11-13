import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconLaunch from './icon-launch.vue'

export const IconLaunch: IconComponent = Object.assign(_IconLaunch, {
  install(app: App) { app.component(_IconLaunch.name, _IconLaunch) },
})
