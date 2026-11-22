import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBulb from './icon-bulb.vue'

export const IconBulb: IconComponent = Object.assign(_IconBulb, {
  install(app: App) { app.component(_IconBulb.name!, _IconBulb) },
})
