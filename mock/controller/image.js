const { mock } = require('mockjs')
const { getRandomImage } = require('../utils')

module.exports = [
  {
    url: '/images',
    type: 'get',
    response(config) {
      const { width, height } = config.query
      const imgUrl = mock(getRandomImage(width, height))
      return {
        code: 200,
        msg: '',
        result: {
          imgUrl
        }
      }
    }
  }
]
