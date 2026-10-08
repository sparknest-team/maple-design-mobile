import type { App } from 'vue'
import _IconIdCard from './icon-id-card.vue'

export const IconIdCard = Object.assign(_IconIdCard, {
  install(app: App) { app.component(_IconIdCard.name, _IconIdCard) },
})
