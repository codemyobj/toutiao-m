import Vue from 'vue'
import VueRouter from 'vue-router'
import { Dialog } from 'vant'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { requireAuth: false }
  },
  {
    path: '/',
    component: () => import('@/components/tabbar/'),
    children: [
      {
        path: '',//默认子路由
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { requireAuth: false }
      },
      {
        path: '/qa',//默认子路由
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { requireAuth: true }
      },
      {
        path: '/video',//默认子路由
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { requireAuth: true }
      }, {
        path: '/my',//默认子路由
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { requireAuth: false }
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { requireAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由参数映射到组件的props中 无论是访问还是维护都很方便
    props: true,
    meta: { requireAuth: false }
  },
  {
    path: '/user/profile',
    name: '/user-profile',
    component: () => import('@/views/user-profile'),
    meta: { requireAuth: false }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 校验登录状态 提示用户
  if (to.meta.requireAuth) {
    // 如果登陆 直接跳过
    if (store.state.user) {
      return next()
    }

    // 没有登录 提示登录
    Dialog.confirm({
      title: '访问提示',
      message: '该功能需要登录才能访问，确认登录吗'
    }).then(() => { //确认执行这里
      router.replace({
        name: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }).catch(() => { //取消执行这里
      // 取消了 中断导航守卫
      next(false)
    })
  } else {
    // 不需要登录的页面 直接过去
    next()
  }

})

export default router
