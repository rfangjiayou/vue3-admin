import { createRouter, createWebHashHistory } from 'vue-router'
import { getLocalStorage } from '@/utils'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "Layout" */ '@/layout/index.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          label: '首页'
        },
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue')
      },
      {
        path: 'components',
        name: 'Components',
        meta: {
          label: '组件'
        },
        component: () => import(/* webpackChunkName: "Components" */ '@/views/Components/index.vue'),
        children: [
          {
            path: 'editor',
            name: 'Editor',
            meta: {
              label: '富文本编辑器'
            },
            component: () => import(/* webpackChunkName: "Editor" */ '@/views/Components/Editor/index.vue')
          },
          {
            path: 'verify',
            name: 'Verify',
            meta: {
              label: '滑动验证码'
            },
            component: () => import(/* webpackChunkName: "Verify" */ '@/views/Components/Verify/index.vue')
          },
          {
            path: 'drag-dialog',
            name: 'DragDialog',
            meta: {
              label: '可拖拽弹窗'
            },
            component: () => import(/* webpackChunkName: "DragDialog" */ '@/views/Components/DragDialog/index.vue')
          },
          {
            path: 'magnifier',
            name: 'Magnifier',
            meta: {
              label: '放大镜'
            },
            component: () => import(/* webpackChunkName: "Magnifier" */ '@/views/Components/Magnifier/index.vue')
          },
          {
            path: 'avatar-upload',
            name: 'AvatarUpload',
            meta: {
              label: '头像上传'
            },
            component: () => import(/* webpackChunkName: "AvatarUpload" */ '@/views/Components/AvatarUpload/index.vue')
          }
          // {
          //   path: 'flow-chart',
          //   name: 'FlowChart',
          //   meta: {
          //     label: '流程图'
          //   },
          //   component: () => import(/* webpackChunkName: "FlowChart" */ '@/views/Components/FlowChart/index.vue')
          // }
        ]
      },
      {
        path: 'chart',
        name: 'Chart',
        meta: {
          label: '图表'
        },
        component: () => import(/* webpackChunkName: "Chart" */ '@/views/Chart/index.vue')
      },
      {
        path: 'error',
        name: 'Error',
        meta: {
          label: '错误页'
        },
        component: () => import(/* webpackChunkName: "Error" */ '@/views/Error/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  const token = getLocalStorage('token')
  if (token) {
    next()
  } else {
    if (to.name !== 'Login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  Nprogress.done()
})

export default router
