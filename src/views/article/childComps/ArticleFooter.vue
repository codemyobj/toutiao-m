<template>
  <div class="article-footer">
    <van-button class="comment-btn" type="default" round size="small" @click="isPostShow=true">写评论</van-button>
    <van-icon name="comment-o" :badge="totalCount" color="#777" />
    <van-icon
      :name="article.is_collected ? 'star' : 'star-o'"
      :color="article.is_collected ? 'orange' : '#777'"
      :loading="isCollectLoading"
      @click="onCollect"
    />
    <van-icon
      :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
      :color="article.attitude === 1 ? 'red': '#777'"
      @click="onLike"
    />
    <van-icon name="share" color="#777" />

    <!-- 评论弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment :target="articleId" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import { addCollect, cancelCollect, addLike, cancelLike } from "@/api/article";
import PostComment from "./PostComment";

export default {
  name: "ArticleFooter",
  components: {
    PostComment,
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
    article: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isCollectLoading: false,
      isPostShow: false,
    };
  },
  methods: {
    async onCollect() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true, //禁止背景点击
      });
      if (this.article.is_collected) {
        await cancelCollect(this.article.art_id);
      } else {
        await addCollect(this.article.art_id);
      }

      // 取消/收藏
      this.article.is_collected = !this.article.is_collected;

      this.$toast.success(this.article.is_collected ? "收藏成功" : "取消收藏");
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true, //禁止背景点击
      });
      if (this.article.attitude === 1) {
        await cancelLike(this.article.art_id);
        this.article.attitude = -1;
      } else {
        await addLike(this.article.art_id);
        this.article.attitude = 1;
      }
      this.$toast.success(
        this.article.attitude === 1 ? "点赞成功" : "取消点赞"
      );
    },
    onPostSuccess(comment) {
      this.list.unshift(comment);
      this.totalCount++;
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
  .van-icon {
    width: 150px;
    .van-info {
      position: absolute;
      right: 25px;
    }
  }
}
</style>