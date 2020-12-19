import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import vuePrototype from '@/utils/prototype.js'
import ECharts from './echarts'

import Page from '@/components/Page'
import IconSvg from '@/components/IconSvg'

const install = (app, options) => {
  app.use(ElementPlus)
  app.use(vuePrototype)

  app.component('Page', Page)
  app.component('IconSvg', IconSvg)
  app.component('Chart', ECharts)
}

export default install
