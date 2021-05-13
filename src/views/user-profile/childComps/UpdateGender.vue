<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";

export default {
  name: "UpdateGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  methods: {
    async onConfirm() {
      //请求提交更新
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      await editUserProfile({
        gender: this.defaultIndex,
      });
      //更新成功 -> 修改父组件name -> 关闭弹窗
      // 发布input事件 更新父组件v-model绑定的数据
      this.$emit("input", this.defaultIndex);
      this.$emit("close");
      this.$toast.success("保存成功");
    },
    onChange(picker, value, index) {
      this.defaultIndex = index;
    },
  },
};
</script>
<style scoped lang='less'>
</style>