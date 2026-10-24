import { createApp } from 'vue'
import Maple, { Locale } from '@maple-design/ui'
import App from './App.vue'
import '@vue/repl/style.css'
import '@maple-design/ui/style'
import '@maple-design/touch-emulator'

Locale.add('en-US', Locale.enUS)
Locale.use('en-US')

createApp(App).use(Maple).mount('#app')
