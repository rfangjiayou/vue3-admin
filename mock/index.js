/**
 * 本地注册mock server，并监听文件变化，重新注册路由
 */

const chokidar = require('chokidar')
const chalk = require('chalk')
// 处理程序之前，在中间件中对传入的请求体进行解析
const bodyParser = require('body-parser')
const path = require('path')
const mockPath = path.join(process.cwd(), 'mock')
const { getMockList } = require('./utils')

const registerRoutes = app => {
  let mockLastIndex
  const mocks = []
  const mockList = getMockList()
  mockList.forEach(ele => {
    const tmpObj = require(ele)
    mocks.push(...tmpObj)
  })
  // mocks.forEach(mock => {

  // })
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocks).length

  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

const unregisterRoutes = () => {
  // require.cache: 被引入的模块将被缓存在这个对象中。 从此对象中删除键值对将会导致下一次 require 重新加载被删除的模块。
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockPath)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

// 请求→响应头解析→注册监听逻辑→清除缓存→响应服务
module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockPath, {
      ignored: /mock-server/,
      ignoreInitial: true
    })
    .on('all', event => {
      try {
        if (event === 'change' || event === 'add') {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)

          // clear routes cache
          unregisterRoutes()

          const routes = registerRoutes(app)
          mockRoutesLength = routes.mockRoutesLength
          mockStartIndex = routes.mockStartIndex
        }
      } catch (err) {
        console.log(chalk.redBright(err))
      }
    })
}
