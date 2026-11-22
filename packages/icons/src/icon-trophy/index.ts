import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTrophy from './icon-trophy.vue'

export const IconTrophy: IconComponent = Object.assign(_IconTrophy, {
  install(app: App) { app.component(_IconTrophy.name!, _IconTrophy) },
})
