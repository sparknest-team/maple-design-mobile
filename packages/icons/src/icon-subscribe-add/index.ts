import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconSubscribeAdd from './icon-subscribe-add.vue'

export const IconSubscribeAdd: IconComponent = Object.assign(_IconSubscribeAdd, {
  install(app: App) { app.component(_IconSubscribeAdd.name!, _IconSubscribeAdd) },
})
