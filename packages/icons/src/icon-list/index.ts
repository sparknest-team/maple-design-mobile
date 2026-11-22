import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconList from './icon-list.vue'

export const IconList: IconComponent = Object.assign(_IconList, {
  install(app: App) { app.component(_IconList.name!, _IconList) },
})
