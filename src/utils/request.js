import http from './axios'

export const get = (url, data = {}, config = {}) => {
  const options = Object.assign(
    {
      params: data
    },
    config
  )
  return http.get(url, options)
}
export const del = (url, data = {}, config = {}) => {
  const options = Object.assign(
    {
      params: data
    },
    config
  )
  return http.delete(url, options)
}

export const post = (url, data = {}, config = {}) =>
  http.post(url, data, config)
export const put = (url, data = {}, config = {}) => http.put(url, data, config)
export const patch = (url, data = {}, config = {}) =>
  http.patch(url, data, config)

export default {
  get,
  post,
  put,
  patch,
  del
}
