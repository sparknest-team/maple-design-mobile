import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconMusic from './icon-music.vue'

export const IconMusic: IconComponent = Object.assign(_IconMusic, {
  install(app: App) { app.component(_IconMusic.name!, _IconMusic) },
})
