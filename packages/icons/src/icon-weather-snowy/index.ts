import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherSnowy from './icon-weather-snowy.vue'

export const IconWeatherSnowy: IconComponent = Object.assign(_IconWeatherSnowy, {
  install(app: App) { app.component(_IconWeatherSnowy.name!, _IconWeatherSnowy) },
})
