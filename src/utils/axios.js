import axios from 'axios'
// import { createApp } from 'vue'
import qs from 'qs'
import {
  requestTimeout,
  contentType
} from '@/constant'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

const handleErrorCode = (code, msg) => {
  switch (code) {
  case 401:
    break
  case 500:
    break
  default:
    break
  }
}

instance.interceptors.request.use(
  config => {
    if (config.data && config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    ) {
      config.data = qs.stringify(config.data)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const { data } = response
    data.success = false
    if (data.code === 200) {
      data.success = true
    } else {
      const { code, msg } = data
      handleErrorCode(code, msg)
    }
    return data
  },
  error => {
    handleErrorCode()
    return error
  }
)

export default instance
