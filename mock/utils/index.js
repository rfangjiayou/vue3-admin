const { Random } = require('mockjs')
const { join } = require('path')
const fs = require('fs')

const getRandomImage = (width = 50, height = 50) => {
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

const getMockList = () => {
  const mockArray = []
  const getFiles = (filePath) => {
    const jsonFiles = []
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path)
      files.forEach(file => {
        const fPath = join(path, file)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findJsonFile(file)
        if (stat.isFile() === true) jsonFiles.push(file)
      })
    }
    findJsonFile(filePath)
    jsonFiles.forEach(ele => {
      mockArray.push(`./controller/${ele}`)
    })
  }
  getFiles('mock/controller')

  return mockArray
}

module.exports = {
  getMockList,
  getRandomImage
}
