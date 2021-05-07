import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/components/layout/'),
    children: [
      {
        path: '',//默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',//默认子路由
        name: 'qa',
        component: () => import('@/views/qa/')
      }, {
        path: '/video',//默认子路由
        name: 'video',
        component: () => import('@/views/video/')
      }, {
        path: '/my',//默认子路由
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
