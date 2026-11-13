import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHome from './icon-home.vue'

export const IconHome: IconComponent = Object.assign(_IconHome, {
  install(app: App) { app.component(_IconHome.name, _IconHome) },
})
