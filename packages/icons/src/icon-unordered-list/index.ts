import type { App } from 'vue'
import _IconUnorderedList from './icon-unordered-list.vue'

export const IconUnorderedList = Object.assign(_IconUnorderedList, {
  install(app: App) { app.component(_IconUnorderedList.name, _IconUnorderedList) },
})
