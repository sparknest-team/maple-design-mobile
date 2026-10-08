import type { App } from 'vue'
import _IconXiguaColor from './icon-xigua-color.vue'

export const IconXiguaColor = Object.assign(_IconXiguaColor, {
  install(app: App) { app.component(_IconXiguaColor.name, _IconXiguaColor) },
})
