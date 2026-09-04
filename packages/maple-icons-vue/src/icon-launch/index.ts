import type { App } from 'vue'
import _IconLaunch from './icon-launch.vue'

export const IconLaunch = Object.assign(_IconLaunch, {
  install(app: App) {
    app.component(_IconLaunch.name, _IconLaunch)
  },
})
