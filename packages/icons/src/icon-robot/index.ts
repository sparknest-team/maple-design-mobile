import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRobot from './icon-robot.vue'

export const IconRobot: IconComponent = Object.assign(_IconRobot, {
  install(app: App) { app.component(_IconRobot.name!, _IconRobot) },
})
