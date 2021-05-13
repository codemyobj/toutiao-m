<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      placeholder="请输入留言"
      input-align="left"
      autosize
      type="textarea"
      maxlength="50"
      show-word-limit
      class="comment_input"
    />
    <van-button class="post_btn" @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { postComment } from "@/api/comment";

export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    //如果是发布评论回复 则也需要传递文章ID
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "", //输入内容
    };
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
      });
      const { data } = await postComment({
        target: this.target.toString(), //	评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
        content: this.message, //	评论内容
        art_id: this.articleId ? this.articleId.toString() : null,
      });
      this.$emit("post-success", data.data.new_obj);

      this.$toast.success("发布成功");

      this.message = "";
    },
  },
};
</script>
<style scoped lang='less'>
.post-comment {
  display: flex;
  align-items: center;
  .comment_input {
    background-color: rgb(248, 244, 244);
  }
  .post_btn {
    height: 88px;
    width: 100px;
    background: #fff;
    font-size: 20px;
  }
}
</style>