import { createApp } from 'vue'
import MapleUI from '@maple-design/ui-vue'
import App from './App.vue'
import '@maple-design/ui-vue/style'
import '@maple-design/touch-emulator-vue'

createApp(App).use(MapleUI).mount('#app')
