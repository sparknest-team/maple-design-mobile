import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconGithub from './icon-github.vue'

export const IconGithub: IconComponent = Object.assign(_IconGithub, {
  install(app: App) { app.component(_IconGithub.name, _IconGithub) },
})
