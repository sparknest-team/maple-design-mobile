import type { App } from 'vue'
import _IconWeatherPouring from './icon-weather-pouring.vue'

export const IconWeatherPouring = Object.assign(_IconWeatherPouring, {
  install(app: App) {
    app.component(_IconWeatherPouring.name, _IconWeatherPouring)
  },
})
