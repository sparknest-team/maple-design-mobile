import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconFormula from './icon-formula.vue'

export const IconFormula: IconComponent = Object.assign(_IconFormula, {
  install(app: App) { app.component(_IconFormula.name!, _IconFormula) },
})
