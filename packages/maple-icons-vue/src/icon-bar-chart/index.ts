import type { App } from 'vue'
import _IconBarChart from './icon-bar-chart.vue'

export const IconBarChart = Object.assign(_IconBarChart, {
  install(app: App) { app.component(_IconBarChart.name, _IconBarChart) },
})
