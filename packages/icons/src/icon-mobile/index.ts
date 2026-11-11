import type { App } from 'vue'
import _IconMobile from './icon-mobile.vue'

export const IconMobile = Object.assign(_IconMobile, {
  install(app: App) { app.component(_IconMobile.name, _IconMobile) },
})
