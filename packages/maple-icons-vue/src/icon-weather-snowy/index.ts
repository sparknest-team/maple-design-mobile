import type { App } from 'vue'
import _IconWeatherSnowy from './icon-weather-snowy.vue'

export const IconWeatherSnowy = Object.assign(_IconWeatherSnowy, {
  install(app: App) {
    app.component(_IconWeatherSnowy.name, _IconWeatherSnowy)
  },
})
