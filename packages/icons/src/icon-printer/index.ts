import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconPrinter from './icon-printer.vue'

export const IconPrinter: IconComponent = Object.assign(_IconPrinter, {
  install(app: App) { app.component(_IconPrinter.name!, _IconPrinter) },
})
