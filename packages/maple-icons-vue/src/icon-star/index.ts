import type { App } from 'vue'
import _IconStar from './icon-star.vue'

export const IconStar = Object.assign(_IconStar, {
  install(app: App) {
    app.component(_IconStar.name, _IconStar)
  },
})
