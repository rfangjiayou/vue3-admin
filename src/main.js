import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import plugins from './plugins'
import '@/styles/index.scss'

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

const app = createApp(App)

app.use(store).use(router).use(plugins).mount('#app')
