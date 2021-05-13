<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      class="toolbar"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from "@/api/user";

import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    file: {
      // type: [Object,],
      required: true,
    },
  },
  data() {
    return {
      img: window.URL.createObjectURL(this.file),
      cropper: null, //裁切器实例
    };
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: "move",
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file);
        });
      });
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      const file = await this.getCroppedCanvas();
      const fd = new FormData();
      fd.append("photo", file);

      await updateUserPhoto(fd);
      // 更新
      this.$emit("update-photo", window.URL.createObjectURL(file));

      // 关闭弹出层
      this.$emit("close");
      this.$toast.success("保存成功");
    },
  },
};
</script>
<style scoped lang='less'>
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
}
.img {
  display: block;
  max-width: 100%;
}
</style>