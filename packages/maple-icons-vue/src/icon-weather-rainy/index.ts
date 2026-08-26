import type { App } from 'vue'
import _IconWeatherRainy from './icon-weather-rainy.vue'

export const IconWeatherRainy = Object.assign(_IconWeatherRainy, {
  install(app: App) {
    app.component(_IconWeatherRainy.name, _IconWeatherRainy)
  },
})
