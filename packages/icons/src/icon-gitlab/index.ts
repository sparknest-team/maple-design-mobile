import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconGitlab from './icon-gitlab.vue'

export const IconGitlab: IconComponent = Object.assign(_IconGitlab, {
  install(app: App) { app.component(_IconGitlab.name, _IconGitlab) },
})
