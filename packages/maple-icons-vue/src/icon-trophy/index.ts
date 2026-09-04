import type { App } from 'vue'
import _IconTrophy from './icon-trophy.vue'

export const IconTrophy = Object.assign(_IconTrophy, {
  install(app: App) {
    app.component(_IconTrophy.name, _IconTrophy)
  },
})
