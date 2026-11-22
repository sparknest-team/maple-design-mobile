import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWhiteBalanceSunny from './icon-white-balance-sunny.vue'

export const IconWhiteBalanceSunny: IconComponent = Object.assign(_IconWhiteBalanceSunny, {
  install(app: App) { app.component(_IconWhiteBalanceSunny.name!, _IconWhiteBalanceSunny) },
})
