<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment-item
        v-for="(comment,index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click',$event)"
      />
      <!-- <van-cell v-for="(comment,index) in list" :key="index" :title="comment.content" /> -->
    </van-list>
  </div>
</template>

<script>
import { getComments } from "@/api/comment";

import CommentItem from "./CommentItem";

export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    //源id，文章id或评论id
    source: {
      type: [Number, String, Object],
      required: true,
    },
    type: {
      type: String,
      default: "a",
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取下一页数据的页码
      limit: 10, //每页十条
      totalCount: 0, //回复总数
    };
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.source.toString(), //源id，文章id或评论id
        offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit,
      });
      console.log(data);
      this.totalCount = data.data.total_count;

      this.$emit("update-total-count", data.data.total_count);

      const { results } = data.data;
      this.list.push(...results);

      this.loading = false;

      if (results.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>
<style scoped lang='less'>
</style>