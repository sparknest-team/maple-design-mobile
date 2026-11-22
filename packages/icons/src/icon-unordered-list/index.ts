import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconUnorderedList from './icon-unordered-list.vue'

export const IconUnorderedList: IconComponent = Object.assign(_IconUnorderedList, {
  install(app: App) { app.component(_IconUnorderedList.name!, _IconUnorderedList) },
})
