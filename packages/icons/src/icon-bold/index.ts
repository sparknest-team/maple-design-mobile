import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBold from './icon-bold.vue'

export const IconBold: IconComponent = Object.assign(_IconBold, {
  install(app: App) { app.component(_IconBold.name!, _IconBold) },
})
