import type { App } from 'vue'
import _IconDice from './icon-dice.vue'

export const IconDice = Object.assign(_IconDice, {
  install(app: App) { app.component(_IconDice.name, _IconDice) },
})
