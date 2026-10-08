import type { App } from 'vue'
import _IconList from './icon-list.vue'

export const IconList = Object.assign(_IconList, {
  install(app: App) { app.component(_IconList.name, _IconList) },
})
