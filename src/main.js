import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import '@/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus)

app.use(store).use(router).mount('#app')
