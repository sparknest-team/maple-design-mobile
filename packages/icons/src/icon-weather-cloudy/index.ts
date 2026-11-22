import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherCloudy from './icon-weather-cloudy.vue'

export const IconWeatherCloudy: IconComponent = Object.assign(_IconWeatherCloudy, {
  install(app: App) { app.component(_IconWeatherCloudy.name!, _IconWeatherCloudy) },
})
