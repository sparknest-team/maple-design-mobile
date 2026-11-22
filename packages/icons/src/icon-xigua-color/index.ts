import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconXiguaColor from './icon-xigua-color.vue'

export const IconXiguaColor: IconComponent = Object.assign(_IconXiguaColor, {
  install(app: App) { app.component(_IconXiguaColor.name!, _IconXiguaColor) },
})
