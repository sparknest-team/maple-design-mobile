import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconInteraction from './icon-interaction.vue'

export const IconInteraction: IconComponent = Object.assign(_IconInteraction, {
  install(app: App) { app.component(_IconInteraction.name!, _IconInteraction) },
})
