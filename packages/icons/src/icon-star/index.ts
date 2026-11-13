import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconStar from './icon-star.vue'

export const IconStar: IconComponent = Object.assign(_IconStar, {
  install(app: App) { app.component(_IconStar.name, _IconStar) },
})
