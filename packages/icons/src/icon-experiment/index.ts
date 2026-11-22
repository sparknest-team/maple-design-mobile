import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconExperiment from './icon-experiment.vue'

export const IconExperiment: IconComponent = Object.assign(_IconExperiment, {
  install(app: App) { app.component(_IconExperiment.name!, _IconExperiment) },
})
