import type { App } from 'vue'
import _IconCommand from './icon-command.vue'

export const IconCommand = Object.assign(_IconCommand, {
  install(app: App) {
    app.component(_IconCommand.name, _IconCommand)
  },
})
