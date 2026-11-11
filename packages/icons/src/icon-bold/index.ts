import type { App } from 'vue'
import _IconBold from './icon-bold.vue'

export const IconBold = Object.assign(_IconBold, {
  install(app: App) { app.component(_IconBold.name, _IconBold) },
})
