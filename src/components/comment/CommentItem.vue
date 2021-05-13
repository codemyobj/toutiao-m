<template>
  <van-cell class="comment-item">
    <van-image round slot="icon" class="avatar" fit="cover" :src="comment.aut_photo" />

    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon
            class="like-icon"
            :class="{liked: comment.is_liking}"
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
          />
          <span class="like-count">{{comment.like_count}}</span>
        </div>
      </div>

      <div class="content">{{comment.content}}</div>

      <div class="num-wrap">
        <span class="pubdate">{{comment.pubdate | daytime('MM-DD HH:MM') }}</span>
        <van-button
          class="reply-btn"
          round
          size="mini"
          @click="$emit('reply-click',comment)"
        >{{comment.reply_count}} 回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancleCommentLike } from "@/api/comment";

export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async onCommentLike() {
      const commendId = this.comment.com_id.toString();
      if (this.comment.is_liking) {
        await cancleCommentLike(commendId);
        this.comment.like_count--;
      } else {
        await addCommentLike(commendId);
        this.comment.like_count++;
      }
      this.comment.is_liking = !this.comment.is_liking;
    },
  },
};
</script>
<style scoped lang='less'>
.comment-item {
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222222;
  }
  .pubdate {
    font-size: 10px;
    color: #222222;
    margin-right: 10px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .like-wrap {
      display: flex;
      align-items: center;
    }
  }
  .num-wrap {
    display: flex;
    align-items: center;
  }
  .liked {
    color: red;
  }
}
</style>