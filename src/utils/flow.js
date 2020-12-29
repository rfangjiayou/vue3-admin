import { createApp } from 'vue'
import go from 'gojs'

const install = (app, options) => {
  app.config.globalProperties.$go = go
  app.config.globalProperties.$make = go.GraphObject.make
}

const VUEAPP = createApp({})
VUEAPP.use(install)

export const globalApp = VUEAPP.config.globalProperties

export default install
