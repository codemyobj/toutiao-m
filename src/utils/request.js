// 封装网络请求
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', //基础路径
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

//请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  //  如果用户已登录 统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 处理完之后一定要把config返回 否则请求就无法发出
  return config
}, err => {
  return Promise.reject(error)
})


// 响应拦截器
request.interceptors.response.use(response => {
  return response
}, async error => {

  const status = error.response.status
  if (status === 400) {
    //客户端参数错误
    Toast.fail('客户端操作异常')
  } else if (status === 401) {
    //身份过期 token无效
    // 如果没有user 或者 user.token 直接登录
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳转到登录页
      return redirectLogin()
    }
    // 使用refresh_token 则请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        url: '/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      user.token = data.data.token
      store.commit('serUser', user)

      return request(err.config)
    } catch (err) {
      // 刷新token 失败 直接跳转登录页
      redirectLogin()
    }
    // 拿到新的token之后把它更新到容器中
    // 把失败的请求重新出去
  } else if (status === 403) {
    //没有权限
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    //服务端异常
    Toast.fail('服务端异常，请稍后重试')

  }

  return Promise.reject(error)
})

function redirectLogin() {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

export default request