import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMobile from './icon-mobile.vue'

export const IconMobile: IconComponent = Object.assign(_IconMobile, {
  install(app: App) { app.component(_IconMobile.name, _IconMobile) },
})
