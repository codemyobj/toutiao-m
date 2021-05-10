<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">
        <van-button
          type="info"
          slot="title"
          icon="search"
          class="search-btn"
          round
          size="small"
          to="/search"
        >搜索</van-button>
      </div>
    </nav-bar>

    <!-- 文章频道列表 -->
    <!-- 标签页组件有一个功能 只有你第一次查看标签页的时候才会渲染里面的内容 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab v-for="(item,index) in channels" :key="index" :title="item.name">
        <!-- 文章列表 -->
        <article-list :channel="item" />
      </van-tab>

      <!-- 汉堡按钮定位把列表最后的位置给挡住了,解决办法就是在这里添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div class="wap-nav-wrap" slot="nav-right" @click="isChannelEditShow=true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      closeable
      v-model="isChannelEditShow"
      position="bottom"
      close-icon-position="top-left"
      class="channel-edit-popup"
      get-container="body"
      style="height: 100%"
    >
      <channel-edit
        :active="active"
        :user-channels="channels"
        @close="isChannelEditShow = false"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/";

import ArticleList from "./childComps/ArticleList";
import ChannelEdit from "./childComps/ChannelEdit";

import { getUserChannels } from "@/api/user";

import { mapState } from "vuex";

import { getItem } from "@/utils/storage";

export default {
  name: "HomeIndex",
  components: {
    NavBar,
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0, //控制被激活的标签
      channels: [],
      isChannelEditShow: false, //控制编辑平道的显示状态
    };
  },
  created() {
    this.loadChannels();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async loadChannels() {
      // 请求获取频道数据
      let channels = [];
      if (this.user) {
        // 已登录 获取线上的频道列表数据
        const { data } = await getUserChannels();
        channels = data.data.channels;
      } else {
        // 没有登录，判断是否有本地存储的列表数据
        const localChannels = getItem("user-channels");

        // 如果有本地存储的频道列表 则使用
        if (localChannels) {
          channels = localChannels;
        } else {
          // 用户没有登录也没有本地存储的频道列表
          // 请求获取推荐的频道列表
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      // 把处理好的数据放入data
      this.channels = channels;
      // const { data } = await getUserChannels();
      // this.channels = data.data.channels;
    },
    onUpdateActive(index) {
      this.active = index;
    },
  },
};
</script>
<style scoped lang='less'>
.home-container {
  /deep/ .van-nav-bar__title {
    min-width: unset;
  }
  .nav-bar {
    display: flex;
    justify-content: center;
    height: 48px;
    .search-btn {
      vertical-align: middle;
      width: 277px;
      height: 32px;
      background-color: #53a8ff;
      border: none;
      .van-button__text {
        font-size: 14px;
      }
      .van-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background-color: #2791fd;
    }
  }
  .wap-nav-placeholder {
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 44px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    width: 33px;
    .van-icon {
      font-size: 25px;
    }
    &:before {
      content: "";
      width: 1px;
      height: 29px;
    }
  }
}
</style>