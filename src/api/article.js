// 文章请求模块
import request from '@/utils/request'

// 获取首页文章列表
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

// 获取文章正文内容
export const getArticleDetails = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET',
  })
}

// 收藏文章
export const addCollect = articleId => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

// 取消收藏文章
export const cancelCollect = articleId => {
  return request({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'DELETE',
  })
}

// 对文章点赞
export const addLike = articleId => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

// 取消文章点赞
export const cancelLike = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE',
  })
}

