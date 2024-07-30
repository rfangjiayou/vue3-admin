import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import vuePrototype from '@/utils/prototype.js'
import flow from '@/utils/flow.js'

import drag from '@/directive/dialogDrag'

import Page from '@/components/Page'
import IconSvg from '@/components/IconSvg'
import Chart from '@/components/Chart'
import Player from '@/components/Player'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const install = (app, options) => {
  app.use(ElementPlus)
  app.use(vuePrototype)
  app.use(flow)
  app.use(drag)

  app.component('Page', Page)
  app.component('IconSvg', IconSvg)
  app.component('Chart', Chart)
  app.component('Player', Player)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
