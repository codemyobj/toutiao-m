// 频道模块
import request from '@/utils/request'

// 获取全部频道
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}

// 获取用户添加后的频道列表
export const addUserChannel = data => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data
  })
}

// 获取用户删除后的频道列表
export const deleteUserChannel = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'DELETE',
  })
}


