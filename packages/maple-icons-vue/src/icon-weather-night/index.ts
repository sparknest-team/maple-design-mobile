import type { App } from 'vue'
import _IconWeatherNight from './icon-weather-night.vue'

export const IconWeatherNight = Object.assign(_IconWeatherNight, {
  install(app: App) {
    app.component(_IconWeatherNight.name, _IconWeatherNight)
  },
})
