<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str,index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search',str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";

import { debounce } from "@/utils/debounce";

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //联想建议
      htmlStr: "",
    };
  },
  watch: {
    // 属性名 要监视数据的名称
    // searchText() {
    //   console.log("222");
    // },
    searchText: {
      // 当数据发生改变则会执行 handler 处理函数
      // 防抖处理
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      }, 200),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
  methods: {
    highlight(str) {
      // 正则表达式的构造函数
      return str.replace(
        new RegExp(this.searchText, "gi"),
        `<span style='color:red'>${this.searchText}</span>`
      );
    },
  },
};
</script>
<style scoped lang='less'>
</style>