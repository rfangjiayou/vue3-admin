const { mock } = require('mockjs')
const { getRandomImage } = require('../utils')

const list = []
const listMap = ['vue', 'react', 'javascript', 'element-plus']
for (let i = 0; i < 4; i++) {
  list.push(
    mock({
      label: listMap[i],
      percentage: '@integer(0, 100)'
    })
  )
}
const imgUrl = getRandomImage(400, 240)

module.exports = [
  {
    url: '/self-panel',
    type: 'get',
    response(config) {
      return {
        code: 200,
        msg: '',
        result: {
          list,
          imgUrl
        }
      }
    }
  }
]
