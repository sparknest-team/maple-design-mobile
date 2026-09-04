import type { App } from 'vue'
import _IconReply from './icon-reply.vue'

export const IconReply = Object.assign(_IconReply, {
  install(app: App) {
    app.component(_IconReply.name, _IconReply)
  },
})
