import { createApp } from 'vue'
import MapleUI from '@maple-design/ui'
import App from './App.vue'
import '@maple-design/ui/es/style'
import '@maple-design/touch-emulator'

createApp(App).use(MapleUI).mount('#app')
