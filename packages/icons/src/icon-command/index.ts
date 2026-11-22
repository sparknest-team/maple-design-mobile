import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconCommand from './icon-command.vue'

export const IconCommand: IconComponent = Object.assign(_IconCommand, {
  install(app: App) { app.component(_IconCommand.name!, _IconCommand) },
})
