import { createApp } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

const install = (app, options) => {
  app.config.globalProperties.$baseMessage = (type, message) => {
    ElMessage({
      message,
      type,
      duration: 3000
    })
  }

  app.config.globalProperties.$baseAlert = (title, content, callback) => {
    ElMessageBox.alert(content, title || '温馨提示', {
      confirmButtonText: '确定',
      callback: (action) => {
        if (callback) {
          callback()
        }
      }
    })
  }

  app.config.globalProperties.$baseConfirm = (title, content, type, callback1, callback2) => {
    ElMessageBox.confirm(content, title || '温馨提示', {
      type
    })
      .then(() => {
        if (callback1) {
          callback1()
        }
      })
      .catch(() => {
        if (callback2) {
          callback2()
        }
      })
  }

  app.config.globalProperties.$baseNotification = (title, message, type) => {
    ElNotification({
      title,
      message,
      type,
      duration: 3000
    })
  }

  app.config.globalProperties.$Bus = createApp({})
}

const VUEAPP = createApp({})
VUEAPP.use(install)

export const globalApp = VUEAPP.config.globalProperties

export default install
