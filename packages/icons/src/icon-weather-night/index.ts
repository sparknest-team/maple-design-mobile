import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherNight from './icon-weather-night.vue'

export const IconWeatherNight: IconComponent = Object.assign(_IconWeatherNight, {
  install(app: App) { app.component(_IconWeatherNight.name, _IconWeatherNight) },
})
