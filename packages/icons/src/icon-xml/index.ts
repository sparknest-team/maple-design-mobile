import type { App } from 'vue'
import type { IconComponent } from '../_utils/icon-component'
import _IconXml from './icon-xml.vue'

export const IconXml: IconComponent = Object.assign(_IconXml, {
  install(app: App) { app.component(_IconXml.name!, _IconXml) },
})
