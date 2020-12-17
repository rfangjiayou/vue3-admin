const tokens = {
  admin: 'admin-token',
  editor: 'editor-token',
  test: 'test-token'
}

module.exports = [
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const token = tokens[username]
      if (!token) {
        return {
          code: 500,
          msg: '用户不存在'
        }
      }
      return {
        code: 200,
        msg: '',
        result: {
          token
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
        msg: ''
      }
    }
  }
]
