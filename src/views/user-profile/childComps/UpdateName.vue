<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('back')"
      @click-right="onConfirm"
    ></van-nav-bar>

    <!-- 输入框 -->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";

export default {
  name: "UpdateName",
  components: {},
  props: {
    // 声明接收父组件v-model传递的value数据
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localName: this.value,
    };
  },
  methods: {
    async onConfirm() {
      try {
        //请求提交更新
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true,
        });
        await editUserProfile({
          name: this.localName,
        });
        //更新成功 -> 修改父组件name -> 关闭弹窗
        // 发布input事件 更新父组件v-model绑定的数据
        this.$emit("input", this.localName);
        this.$emit("back");
        this.$toast.success("保存成功");
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
  },
};
</script>
<style scoped lang='less'>
.name-field-wrap {
  padding: 10px;
}
.van-field {
  border-radius: 15px;
}
</style>