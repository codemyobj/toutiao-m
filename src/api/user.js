import request from '@/utils/request'
// import store from '@/store'

export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 发送短信验证码
export const sendSms = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET',
  })
}

// 获取登录用户的信息
export const getCurrentUser = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
