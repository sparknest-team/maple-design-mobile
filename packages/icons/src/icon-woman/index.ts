import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconWoman from './icon-woman.vue'

export const IconWoman: IconComponent = Object.assign(_IconWoman, {
  install(app: App) { app.component(_IconWoman.name!, _IconWoman) },
})
