import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconH1 from './icon-h1.vue'

export const IconH1: IconComponent = Object.assign(_IconH1, {
  install(app: App) { app.component(_IconH1.name, _IconH1) },
})
