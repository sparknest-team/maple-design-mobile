import { createApp } from 'vue'
import Maple, { Locale } from '@maple-design/ui-vue'
import App from './App.vue'
import '@vue/repl/style.css'
import '@maple-design/ui-vue/style'
import '@maple-design/touch-emulator-vue'

Locale.add('en-US', Locale.enUS)
Locale.use('en-US')

createApp(App).use(Maple).mount('#app')
