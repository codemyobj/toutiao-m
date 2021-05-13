<template>
  <div class="article-detail">
    <!-- 作者区域 -->
    <h1 class="title">{{article.title}}</h1>
    <van-cell center class="author">
      <div class="author-name" slot="title">{{article.aut_name}}</div>
      <van-image class="author-avatar" slot="icon" round fit="cover" :src="article.aut_photo" />
      <div class="pubdate" slot="label">{{article.pubdate | relativeTime}}</div>
      <van-button
        class="follow-btn"
        :type="article.is_followed ? 'default': 'info'"
        :icon="article.is_followed ? '': 'plus'"
        size="small"
        round
        :loading="isFollowLoading"
        @click="onFollow"
      >{{article.is_followed ? '已关注' : '关注'}}</van-button>
    </van-cell>

    <!-- 正文区域 -->
    <div class="markdown-body" v-html="article.content" ref="articleContent"></div>
  </div>
</template>

<script>
import "@/assets/css/github-markdown.css";

import { getArticleDetails } from "@/api/article";
import { addFollow, cancelFollow } from "@/api/user";

import { ImagePreview } from "vant";

export default {
  name: "ArticleDetail",
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, //文章数据
      isFollowLoading: false, //关注用户的按钮loading
    };
  },
  created() {
    this.loadArticleDetail();
  },
  methods: {
    async loadArticleDetail() {
      const { data } = await getArticleDetails(this.articleId);
      this.article = data.data;
      this.$emit("article", this.article);

      // 数据改变影响视图更新 (dom) 不是立即的
      // 所以如果需要在修改数据之后马上操作被该数据影响的视图dom 需要使用$nextTick
      this.$nextTick(() => {
        this.handlePreviewImg();
      });
    },

    handlePreviewImg() {
      //1 获取文章内容dom容器
      const articleContent = this.$refs.articleContent;
      //2 得到所有的img标签
      const imgs = articleContent.querySelectorAll("img");
      const imgPaths = [];
      //3 循环img给所有img注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          //4 在事件函数中调用imagepreview预览
          ImagePreview({
            images: imgPaths, //预览图片路径列表
            startPosition: index, //起始位置
          });
        };
      });
    },

    async onFollow() {
      this.isFollowLoading = true; //开启
      if (this.article.is_followed) {
        //如果已关注 取消关注
        await cancelFollow(this.article.aut_id);
      } else {
        // 如果未关注 添加关注
        await addFollow(this.article.aut_id);
      }
      // 更新视图
      // 由于接口问题 导致页面刷新数据无法同步
      this.article.is_followed = !this.article.is_followed;
      this.isFollowLoading = false; //关闭
    },
  },
};
</script>
<style scoped lang='less'>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.author {
  .author-avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .author-name {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    color: #b4b4b4;
    font-size: 11px;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}

.markdown-body {
  padding: 14px;
  background-color: #fff;
}
</style>