import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherPouring from './icon-weather-pouring.vue'

export const IconWeatherPouring: IconComponent = Object.assign(_IconWeatherPouring, {
  install(app: App) { app.component(_IconWeatherPouring.name, _IconWeatherPouring) },
})
