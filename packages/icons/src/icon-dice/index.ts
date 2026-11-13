import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconDice from './icon-dice.vue'

export const IconDice: IconComponent = Object.assign(_IconDice, {
  install(app: App) { app.component(_IconDice.name, _IconDice) },
})
