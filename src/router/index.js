import { createRouter, createWebHistory } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
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
            path: 'avatar-upload',
            name: 'AvatarUpload',
            meta: {
              label: '头像上传'
            },
            component: () => import(/* webpackChunkName: "AvatarUpload" */ '@/views/Components/AvatarUpload/index.vue')
          }
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  next()
})
router.afterEach(() => {
  Nprogress.done()
})

export default router
