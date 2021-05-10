// 搜索请求模块
import request from '@/utils/request'

// 获取搜索建议
export const getSearchSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q //联想建议关键词
    }
  })
}

// 获取搜索结果
export const getSearchResults = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}

// 获取用户搜索历史
export const getSearchHistories = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'GET'
  })
}