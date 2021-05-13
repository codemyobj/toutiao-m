// 文章评论模块
import request from '@/utils/request'

// 获取首页文章列表
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

// 对评论或评论回复点赞
export const addCommentLike = target => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target //评论id
    }
  })
}

// 取消评论点赞
export const cancleCommentLike = commentId => {
  return request({
    url: `/app/v1_0/article/likings/${commentId}`,
    method: 'DELETE',
  })
}

// 发表评论或回复
export const postComment = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}

