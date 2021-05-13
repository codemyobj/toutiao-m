<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>

    <!--当前评论项 -->
    <comment-item :comment="comment" />

    <!-- 所有回复 -->
    <van-cell title="所有回复" />
    <comment-list :source="comment.com_id" type="c" :list="commentList" />

    <!-- 底部区域 -->
    <div class="article-footer">
      <van-button class="comment-btn" type="default" round size="small" @click="isPostShow=true">写评论</van-button>
    </div>

    <!-- 评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="comment.com_id" :articleId="articleId" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./CommentItem";
import CommentList from "./CommentList";
import PostComment from "@/views/article/childComps/PostComment";

export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    PostComment,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [], //评论的回复列表
    };
  },
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment);
      this.comment.reply_count++;
      this.isPostShow = false;
    },
  },
};
</script>
<style scoped lang='less'>
.article-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .comment-btn {
    width: 450px;
    height: 30px;
    margin: 10px 20px;
    font-size: 15px;
    color: rgb(158, 153, 153);
  }
}
</style>