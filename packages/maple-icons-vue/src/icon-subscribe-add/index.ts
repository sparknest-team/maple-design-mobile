import type { App } from 'vue'
import _IconSubscribeAdd from './icon-subscribe-add.vue'

export const IconSubscribeAdd = Object.assign(_IconSubscribeAdd, {
  install(app: App) {
    app.component(_IconSubscribeAdd.name, _IconSubscribeAdd)
  },
})
