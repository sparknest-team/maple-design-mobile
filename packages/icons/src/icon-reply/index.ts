import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconReply from './icon-reply.vue'

export const IconReply: IconComponent = Object.assign(_IconReply, {
  install(app: App) { app.component(_IconReply.name, _IconReply) },
})
