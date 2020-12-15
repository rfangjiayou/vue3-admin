module.exports = [
  {
    url: '/login',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {}
      }
    }
  },
  {
    url: '/logout',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success'
      }
    }
  }
]
