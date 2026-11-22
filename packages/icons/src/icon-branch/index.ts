import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBranch from './icon-branch.vue'

export const IconBranch: IconComponent = Object.assign(_IconBranch, {
  install(app: App) { app.component(_IconBranch.name!, _IconBranch) },
})
