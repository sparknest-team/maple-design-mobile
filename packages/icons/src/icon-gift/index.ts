import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconGift from './icon-gift.vue'

export const IconGift: IconComponent = Object.assign(_IconGift, {
  install(app: App) { app.component(_IconGift.name, _IconGift) },
})
