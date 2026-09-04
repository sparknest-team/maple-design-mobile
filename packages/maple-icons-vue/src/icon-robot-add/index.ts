import type { App } from 'vue'
import _IconRobotAdd from './icon-robot-add.vue'

export const IconRobotAdd = Object.assign(_IconRobotAdd, {
  install(app: App) {
    app.component(_IconRobotAdd.name, _IconRobotAdd)
  },
})
