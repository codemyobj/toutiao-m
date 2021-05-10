<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span class="delete-all" @click="$emit('update-histories',[])">全部删除</span>
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(history,index) in searchHistories"
      :key="index"
      :title="history"
      @click="historyChoose(history)"
    >
      <!-- @click="$emit('search',history)" -->
      <van-icon v-show="isDeleteShow" name="close" @click="onDelete(index)" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from "@/utils/storage";

export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, //删除的显示状态
    };
  },
  methods: {
    historyChoose(history) {
      if (!this.isDeleteShow) {
        return this.$emit("search", history);
      }
    },
    onDelete(index) {
      this.searchHistories.splice(index, 1);
      // 数据持久化
      // 1 持久化处理
      // 2 请求接口删除线上的数据
      // 无论是否登录都把数据持久到本地
      // 接口只有删除所有历史的功能
      // setItem("histories", this.searchHistories);
    },
  },
};
</script>
<style scoped lang='less'>
.delete-all {
  color: red;
  margin-right: 10px;
}
</style>