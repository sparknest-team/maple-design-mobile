import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherRainy from './icon-weather-rainy.vue'

export const IconWeatherRainy: IconComponent = Object.assign(_IconWeatherRainy, {
  install(app: App) { app.component(_IconWeatherRainy.name, _IconWeatherRainy) },
})
