import { createRouter, createWebHistory } from 'vue-router'

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
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue')
      },
      {
        path: 'components',
        name: 'Components',
        component: () => import(/* webpackChunkName: "Components" */ '@/views/Components/index.vue'),
        children: [
          {
            path: 'editor',
            name: 'Editor',
            component: () => import(/* webpackChunkName: "Editor" */ '@/views/Components/Editor/index.vue')
          },
          {
            path: 'avatar-upload',
            name: 'AvatarUpload',
            component: () => import(/* webpackChunkName: "AvatarUpload" */ '@/views/Components/AvatarUpload/index.vue')
          }
        ]
      },
      {
        path: 'chart',
        name: 'Chart',
        component: () => import(/* webpackChunkName: "Chart" */ '@/views/Chart/index.vue')
      },
      {
        path: 'error',
        name: 'Error',
        component: () => import(/* webpackChunkName: "Error" */ '@/views/Error/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
