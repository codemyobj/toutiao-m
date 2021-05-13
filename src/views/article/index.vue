<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" />
      </div>
      <div slot="center">文章详情</div>
    </nav-bar>

    <div class="article-wrap">
      <!-- 文章详情 -->
      <article-detail :articleId="articleId" @article="getArticle" />

      <!-- 评论模块 -->
      <comment-list
        :source="articleId"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
        @reply-click="onReplyClick"
      />
    </div>

    <!-- 底部区域 -->
    <article-footer
      :articleId="articleId"
      :article="article"
      :list="commentList"
      :totalCount="totalCommentCount"
    />

    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <comment-reply
        v-if="isReplyShow"
        :articleId="articleId"
        :comment="replyComment"
        @close="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import CommentList from "@/components/comment/CommentList";
import CommentReply from "@/components/comment/CommentReply";

import ArticleDetail from "./childComps/ArticleDetail";
import ArticleFooter from "./childComps/ArticleFooter";

export default {
  name: "ArticleIndex",
  components: {
    NavBar,
    ArticleDetail,
    ArticleFooter,
    CommentList,
    CommentReply,
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      commentList: [], //文章评论列表
      totalCommentCount: 0, //评论总数
      isReplyShow: false,
      replyComment: {},
    };
  },
  created() {},
  methods: {
    getArticle(article) {
      this.article = article;
    },
    onReplyClick(comment) {
      this.replyComment = comment;

      // 展示回复内容
      this.isReplyShow = true;
    },
  },
};
</script>
<style scoped lang='less'>
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 45px;
  bottom: 50px;
  overflow-y: auto;
}
</style>