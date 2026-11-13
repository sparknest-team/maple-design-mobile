import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWeatherLightning from './icon-weather-lightning.vue'

export const IconWeatherLightning: IconComponent = Object.assign(_IconWeatherLightning, {
  install(app: App) { app.component(_IconWeatherLightning.name, _IconWeatherLightning) },
})
