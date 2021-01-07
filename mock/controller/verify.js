const { mock } = require('mockjs')
const { getRandomImage } = require('../utils')

const list = []
for (let i = 0; i < 10; i++) {
  const imgUrl = getRandomImage(310, 160)
  list.push(
    mock(imgUrl)
  )
}

module.exports = [
  {
    url: '/verify-images',
    type: 'get',
    response(config) {
      return {
        code: 200,
        msg: '',
        result: {
          list
        }
      }
    }
  }
]
