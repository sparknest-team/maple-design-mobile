import type { App } from 'vue'
import _IconWeatherCloudy from './icon-weather-cloudy.vue'

export const IconWeatherCloudy = Object.assign(_IconWeatherCloudy, {
  install(app: App) {
    app.component(_IconWeatherCloudy.name, _IconWeatherCloudy)
  },
})
