import type { App } from 'vue'
import _IconInteraction from './icon-interaction.vue'

export const IconInteraction = Object.assign(_IconInteraction, {
  install(app: App) {
    app.component(_IconInteraction.name, _IconInteraction)
  },
})
