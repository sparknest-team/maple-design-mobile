import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBarChart from './icon-bar-chart.vue'

export const IconBarChart: IconComponent = Object.assign(_IconBarChart, {
  install(app: App) { app.component(_IconBarChart.name!, _IconBarChart) },
})
