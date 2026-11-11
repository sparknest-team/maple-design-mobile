import type { App } from 'vue'
import _IconWeatherLightning from './icon-weather-lightning.vue'

export const IconWeatherLightning = Object.assign(_IconWeatherLightning, {
  install(app: App) { app.component(_IconWeatherLightning.name, _IconWeatherLightning) },
})
