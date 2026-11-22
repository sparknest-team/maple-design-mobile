import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconBook from './icon-book.vue'

export const IconBook: IconComponent = Object.assign(_IconBook, {
  install(app: App) { app.component(_IconBook.name!, _IconBook) },
})
