import type { App } from 'vue'
import _IconWhiteBalanceSunny from './icon-white-balance-sunny.vue'

export const IconWhiteBalanceSunny = Object.assign(_IconWhiteBalanceSunny, {
  install(app: App) {
    app.component(_IconWhiteBalanceSunny.name, _IconWhiteBalanceSunny)
  },
})
