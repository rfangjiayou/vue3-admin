
// const Mock = require('mockjs') // mockjs 导入依赖模块
// const util = require('./util');     // 自定义工具模块

// const test2_1_tablelist = require('./test2-1_tablelist.js')
// const header = require('./header.js')

// 返回一个函数
module.exports = (app) => {
  // 监听http请求
  app.get('/test2-1/tablelist', (rep, res) => {
    // 每次响应请求时读取mock data的json文件
    // const json = test2_1_tablelist
    // util.getJsonFile方法定义了如何读取json文件并解析成数据对象
    // const json = util.getJsonFile('./test2-1_tablelist.json');
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    // res.json(Mock.mock(json))
  })
  // app.get('/header/user-info', (rep, res) => {
  //   const json = header
  //   res.json(Mock.mock(json))
  // })
}
