import { createApp } from 'vue'
import VarletUI from '@nio-pow/maple-ui'
import App from './App.vue'
import '@nio-pow/maple-ui/es/style'
import '@nio-pow/maple-touch-emulator'

createApp(App).use(VarletUI).mount('#app')
