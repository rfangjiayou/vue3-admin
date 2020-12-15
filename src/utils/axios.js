import axios from 'axios'
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
    // data.success = false
    // if (code === 200) {
    //     res.success = true
    // } else {
    //     Bus.$emit(ERROR_TYPE_MAP.code, code, msg)
    // }
    return data
  },
  error => {
    return error
  }
)

export default instance
