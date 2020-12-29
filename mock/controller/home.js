const { mock } = require('mockjs')
const { getRandomImage } = require('../utils')

const getStatistics = () => {
  const statistics = {
    expected: [],
    actual: []
  }
  Object.keys(statistics).forEach(e => {
    for (let i = 0; i < 7; i++) {
      statistics[e].push(
        mock('@integer(100, 1000)')
      )
    }
  })

  return statistics
}

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
    url: '/statistics',
    type: 'get',
    response(config) {
      const data = getStatistics()
      return {
        code: 200,
        msg: '',
        result: {
          ...data
        }
      }
    }
  },
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
