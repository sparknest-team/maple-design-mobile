import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSkin from './icon-skin.vue'

export const IconSkin: IconComponent = Object.assign(_IconSkin, {
  install(app: App) { app.component(_IconSkin.name, _IconSkin) },
})
