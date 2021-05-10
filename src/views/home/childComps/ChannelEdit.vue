<template>
  <div class="channel-eidt">
    <van-cell center :border="false" class="van-wrap">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in userChannels"
        :icon="(isEdit && index !==0) ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        :class="{active : index === active }"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="'✚ ' + channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel.js";

import { mapState } from "vuex";

import { setItem } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, //控制编辑的显示状态
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    // 推荐的频道列表
    recommendChannels() {
      // 所有频道-我的频道 = 剩下的推荐频道
      // filter方法根据布尔值返回数据
      return this.allChannels.filter(
        (channel) =>
          //     // 判断channel是否属于用户频道
          !this.userChannels.find(
            (userChannel) => userChannel.id === channel.id
            // 找到满足该条件的元素
          )
      );
    },
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
    },
    async onAdd(channel) {
      // console.log(channel);
      this.userChannels.push(channel);
      //数据持久化
      if (this.user) {
        // 如果登录了
        // 这里接口有点问题 请求发出去正常 但添加后刷新还是老样子
        await addUserChannel({
          channels: [{ id: channel.id, seq: this.userChannels.length }],
        });
      } else {
        // 如果未登录 放入本地存储
        setItem("user-channels", this.userChannels);
      }
    },
    onUserChannelClick(channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index);
      } else {
        this.switchChannel(index);
      }
    },
    async deleteChannel(channel, index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit("update-active", this.active - 1);
      }
      this.userChannels.splice(index, 1);

      // 数据持久化
      if (this.user) {
        // 登陆了 持久化到线上
        await deleteUserChannel(channel.id);
      } else {
        setItem("user-channels", this.userChannels);
      }
    },
    switchChannel(index) {
      this.$emit("update-active", index);
      this.$emit("close");
    },
  },
};
</script>
<style scoped lang='less'>
.channel-eidt {
  padding-top: 54px;
  .van-wrap {
    margin-bottom: 5px;
    .channel-title {
      font-size: 16px;
      color: #333;
    }
    .edit-btn {
      width: 50px;
      height: 20px;
      vertical-align: middle;
    }
  }

  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f3f5f7;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -8px;
      top: -8px;
      font-size: 20px;
      color: #ccc;
    }
  }

  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>