import type { App } from 'vue'
import _IconXml from './icon-xml.vue'

export const IconXml = Object.assign(_IconXml, {
  install(app: App) {
    app.component(_IconXml.name, _IconXml)
  },
})
