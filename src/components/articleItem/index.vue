<template>
  <!-- <div class="article-item"> -->
  <van-cell
    class="article-item"
    :to="{
      name:'article',
      params: {
        articleId :article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-wrap-item" v-for="(img,index) in article.cover.images" :key="index">
          <van-image fit="cover" :src="img" height="73" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 默认插槽的名字叫default 可以省略 -->
    <van-image
      class="right-cover"
      v-if="article.cover.type === 1"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
  <!-- </div> -->
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped lang='less'>
.article-item {
  display: flex;
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-item {
      flex: 1;
      height: 73px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
    span:first-child {
      color: rgb(224, 77, 8);
    }
  }
}
</style>