import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconTwitter from './icon-twitter.vue'

export const IconTwitter: IconComponent = Object.assign(_IconTwitter, {
  install(app: App) { app.component(_IconTwitter.name!, _IconTwitter) },
})
