import { createApp } from 'vue'
import MapleUI from '@maplejs/maple-ui'
import App from './App.vue'
import '@maplejs/maple-ui/es/style'
import '@maplejs/maple-touch-emulator'

createApp(App).use(MapleUI).mount('#app')
