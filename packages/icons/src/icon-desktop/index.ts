import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDesktop from './icon-desktop.vue'

export const IconDesktop: IconComponent = Object.assign(_IconDesktop, {
  install(app: App) { app.component(_IconDesktop.name!, _IconDesktop) },
})
