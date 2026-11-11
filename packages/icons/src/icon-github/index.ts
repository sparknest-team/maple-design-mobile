import type { App } from 'vue'
import _IconGithub from './icon-github.vue'

export const IconGithub = Object.assign(_IconGithub, {
  install(app: App) { app.component(_IconGithub.name, _IconGithub) },
})
