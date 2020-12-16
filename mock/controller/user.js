module.exports = [
  {
    url: '/login',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: 'success',
        result: {
          token: 'asdasd'
        }
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
