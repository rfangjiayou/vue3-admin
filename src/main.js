import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import vuePrototype from '@/utils/prototype.js'
import '@/styles/index.scss'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

const app = createApp(App)

app.use(ElementPlus)
app.use(vuePrototype)

app.use(store).use(router).mount('#app')
