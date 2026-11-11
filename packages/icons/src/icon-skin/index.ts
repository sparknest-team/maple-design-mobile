import type { App } from 'vue'
import _IconSkin from './icon-skin.vue'

export const IconSkin = Object.assign(_IconSkin, {
  install(app: App) { app.component(_IconSkin.name, _IconSkin) },
})
