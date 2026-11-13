import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconHeart from './icon-heart.vue'

export const IconHeart: IconComponent = Object.assign(_IconHeart, {
  install(app: App) { app.component(_IconHeart.name, _IconHeart) },
})
