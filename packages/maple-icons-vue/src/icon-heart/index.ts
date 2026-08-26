import type { App } from 'vue'
import _IconHeart from './icon-heart.vue'

export const IconHeart = Object.assign(_IconHeart, {
  install(app: App) {
    app.component(_IconHeart.name, _IconHeart)
  },
})
