<template>
  <div class="user-profile">
    <!-- 导航 -->
    <nav-bar>
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" />
      </div>
      <div slot="center">个人信息</div>
    </nav-bar>

    <!-- 修改信息 -->
    <input type="file" hidden ref="file" accept="image/*" @change="onFileChange" />
    <van-cell-group>
      <van-cell title="头像" is-link center @click="$refs.file.click()">
        <van-image width="30" height="30" round fit="cover" :src="user.photo" />
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true" />
      <van-cell
        title="性别"
        is-link
        :value="user.gender === 0 ? '男' : '女'"
        @click="isEditGenderShow = true"
      />
      <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthdayShow = true" />
    </van-cell-group>

    <!-- 修改昵称 -->
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
      <!-- :name="user.name" -->
      <!-- @update-name="user.name = $event" -->
      <update-name v-if="isEditNameShow" v-model="user.name" @back="isEditNameShow=false" />
    </van-popup>

    <!-- 修改性别 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender v-if="isEditGenderShow" @close="isEditGenderShow=false" v-model="user.gender" />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow=false"
      />
    </van-popup>

    <!-- 修改头像 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
      class="photo-popup"
    >
      <update-photo
        v-if="isEditPhotoShow"
        :file="previwImg"
        @close="isEditPhotoShow=false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/index";

import UpdateName from "./childComps/UpdateName";
import UpdateGender from "./childComps/UpdateGender";
import UpdateBirthday from "./childComps/UpdateBirthday";
import UpdatePhoto from "./childComps/UpdatePhoto";

import { getUserProfile } from "@/api/user";

export default {
  name: "UserProfile",
  components: {
    NavBar,
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto,
  },
  props: {},
  data() {
    return {
      user: {},
      isEditNameShow: false, //编辑昵称的显示状态
      isEditGenderShow: false, //编辑性别
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previwImg: null,
    };
  },
  created() {
    this.loadUserFile();
  },
  methods: {
    async loadUserFile() {
      const { data } = await getUserProfile();
      this.user = data.data;
    },
    onFileChange() {
      // console.log("onFileChange");
      this.isEditPhotoShow = true;
      const file = this.$refs.file.files[0];
      this.previwImg = file;
      this.$refs.file.value = "";
    },
  },
};
</script>
<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
.photo-popup {
  background-color: #000;
}
</style>