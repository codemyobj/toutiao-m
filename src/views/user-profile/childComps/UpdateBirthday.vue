<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from "@/api/user";
import dayjs from "dayjs";

export default {
  name: "UpdateBirthday",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm() {
      //请求提交更新
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });

      const date = dayjs(this.currentDate).format("YYYY-MM-DD");

      await editUserProfile({
        birthday: date,
      });
      //更新成功 -> 修改父组件name -> 关闭弹窗
      // 发布input事件 更新父组件v-model绑定的数据
      this.$emit("input", date);
      this.$emit("close");
      this.$toast.success("保存成功");
    },
  },
};
</script>
<style scoped lang='less'>
</style>