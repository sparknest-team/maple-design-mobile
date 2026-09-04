import type { App } from 'vue'
import _IconBranch from './icon-branch.vue'

export const IconBranch = Object.assign(_IconBranch, {
  install(app: App) {
    app.component(_IconBranch.name, _IconBranch)
  },
})
