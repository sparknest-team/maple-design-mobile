import { createApp } from 'vue'
import Varlet, { Locale } from '@maplejs/maple-ui'
import App from './App.vue'
import '@vue/repl/style.css'
import '@maplejs/maple-ui/es/style'
import '@maplejs/maple-touch-emulator'

Locale.add('en-US', Locale.enUS)
Locale.use('en-US')

createApp(App).use(Varlet).mount('#app')
