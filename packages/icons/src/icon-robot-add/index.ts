import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconRobotAdd from './icon-robot-add.vue'

export const IconRobotAdd: IconComponent = Object.assign(_IconRobotAdd, {
  install(app: App) { app.component(_IconRobotAdd.name!, _IconRobotAdd) },
})
