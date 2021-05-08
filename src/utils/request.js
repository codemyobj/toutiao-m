// 封装网络请求
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', //基础路径
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

export default request