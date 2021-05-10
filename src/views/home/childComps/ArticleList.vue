<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSucess"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" /> -->
        <article-item v-for="(article,index) in articles" :key="index" :article="article" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";

import ArticleItem from "@/components/articleItem";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      articles: [], //数据列表
      loading: false, //控制加载中的loading状态
      finished: false, //控制加载结束的状态，当加载结束就不再触发加载更多
      timestamp: null, //获取下一页数据的时间戳
      isRefreshLoading: false,
      refreshSucess: "", //下拉刷新成功的提示文本
    };
  },
  methods: {
    async onLoad() {
      // 1 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), //时间戳 请求新的推荐数据,传当前的时间戳,请求历史推荐 传历史推荐时间戳 类似于页码
        with_top: 1, //是否包含置顶 进入页面第一次请求时要包含置顶文章 1包含置顶 0不包含
      });
      // 2 把数据放入list数组中
      const { results } = data.data;
      this.articles.push(...results);
      // 注意是push进去的
      // 3 设置本次加载状态结束 才会加载下一次
      this.loading = false;
      // 4 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp;
      } else {
        // 没有数据 把加载数据设置结束 不再触发加载更多
        this.finished = true;
      }
    },
    async onRefresh() {
      // 下拉刷新 组件自己就会展示loading 状态
      // 1 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      // 2 把数据放到数据列表中(往顶部追加)
      const { results } = data.data;
      this.articles.unshift(...results);
      // 3 关闭刷新的状态 loading
      this.isRefreshLoading = false;
      this.refreshSucess = `更新了${results.length}条数据`;
    },
  },
};
</script>
<style scoped lang='less'>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  bottom: 50px;
  overflow-y: auto;
}
</style>