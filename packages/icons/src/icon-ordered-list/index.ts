import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconOrderedList from './icon-ordered-list.vue'

export const IconOrderedList: IconComponent = Object.assign(_IconOrderedList, {
  install(app: App) { app.component(_IconOrderedList.name, _IconOrderedList) },
})
