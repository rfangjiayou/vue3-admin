import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import vuePrototype from '@/utils/prototype.js'
import flow from '@/utils/flow.js'

import Page from '@/components/Page'
import IconSvg from '@/components/IconSvg'
import Chart from '@/components/Chart'
import Player from '@/components/Player'

const install = (app, options) => {
  app.use(ElementPlus)
  app.use(vuePrototype)
  app.use(flow)

  app.component('Page', Page)
  app.component('IconSvg', IconSvg)
  app.component('Chart', Chart)
  app.component('Player', Player)
}

export default install
