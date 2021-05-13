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

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET',
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 关注
export const addFollow = userId => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}

// 取消关注
export const cancelFollow = userId => {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE',
  })
}

// 获取用户信息
export const getUserProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET',
  })
}

// 编辑用户资料
export const editUserProfile = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 编辑用户照片资料
export const updateUserPhoto = data => {
  return request({
    url: '/app/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}