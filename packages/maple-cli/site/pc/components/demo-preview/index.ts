import type { App } from 'vue'
import DemoPreview from './DemoPreview.vue'

DemoPreview.install = function (app: App) {
  app.component('MpSiteDemoPreview', DemoPreview)
}

export default DemoPreview
