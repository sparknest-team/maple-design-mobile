import type { App } from 'vue'
import _IconGitlab from './icon-gitlab.vue'

export const IconGitlab = Object.assign(_IconGitlab, {
  install(app: App) { app.component(_IconGitlab.name, _IconGitlab) },
})
