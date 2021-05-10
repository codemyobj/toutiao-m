<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />

    <!-- 历史记录 -->
    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />
  </div>
</template>

<script>
import SearchSuggestion from "./childComps/SearchSuggestion";
import SearchHistory from "./childComps/SearchHistory";
import SearchResult from "./childComps/SearchResult";

import { setItem, getItem } from "@/utils/storage";

import { mapState } from "vuex";

export default {
  name: "SearchIndex",
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "", //搜索输入框的内容
      isResultShow: false, //控制搜索结果的显示状态
      searchHistories: [], //搜素历史数据
    };
  },
  async created() {
    this.loadSearchHistories();
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    // 监视搜索历史数据的变化 存储到本地存储
    searchHistories() {
      setItem("histories", this.searchHistories);
    },
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;

      const index = this.searchHistories.indexOf(searchText);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      // 把最新的历史记录存储到顶部  unshift 往数组顶部push
      this.searchHistories.unshift(searchText);

      // 如果有登陆则存储线上 只要一调用接口后端会自动存储
      // 如果未登录则存储本地
      // setItem("histories", this.searchHistories);

      // 展示搜索结果
      this.isResultShow = true;
    },
    async loadSearchHistories() {
      // 因为后端提供的搜索历史记录太少
      // 所以这里让后端返回的历史记录和本地的历史记录合并在一起

      const searchHistories = getItem("histories") || [];
      // if (this.user) {
      //   const { data } = await getSearchHistories();
      //   const { keywords } = data.data;
      //   // console.log(keywords);
      //   this.searchHistories = [...new Set([...searchHistories, ...keywords])];
      // }
      this.searchHistories = searchHistories;
    },
  },
};
</script>
<style scoped lang='less'>
</style>