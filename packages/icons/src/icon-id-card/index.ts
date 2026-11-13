import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconIdCard from './icon-id-card.vue'

export const IconIdCard: IconComponent = Object.assign(_IconIdCard, {
  install(app: App) { app.component(_IconIdCard.name, _IconIdCard) },
})
