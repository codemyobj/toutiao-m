<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <!-- 基本信息 -->
      <van-cell center class="base-info" :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" :src="currentUser.photo" />
        <div class="name" slot="title">{{currentUser.name}}</div>
        <van-button class="edit-btn" size="small" round to="/user/profile">编辑资料</van-button>
      </van-cell>

      <!-- 用户数据 -->
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 未登录展现方式 -->
    <div v-else class="not-login">
      <div
        @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })"
      >
        <img class="mobile" src="~@/assets/img/shouji.png" alt />
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <!-- 栅格布局 -->
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>

    <!-- 导航 -->
    <van-cell title="消息通知" is-link to="/" />

    <van-cell v-if="user" title="退出登录" class="logout-cell" @click="onLogout" />
  </div>
</template> 

<script>
import { mapState } from "vuex";
import { getCurrentUser } from "@/api/user";

export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      currentUser: {},
    };
  },
  created() {
    this.loadCurrentUser();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    onLogout() {
      // 提示用户确认退出 如果确认 处理退出
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗?",
        })
        .then(() => {
          // 确认执行
          // 清除用户登录状态
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // 取消执行
          // on cancel
        });
    },
    async loadCurrentUser() {
      const { data } = await getCurrentUser();
      console.log(data);
      this.currentUser = data.data;
    },
  },
};
</script>
<style scoped lang='less'>
.my-container {
  .my-info {
    background: url("~@/assets/img/banner.png") no-repeat;
    background-size: cover;
    .base-info {
      padding-top: 38px;
      padding-bottom: 11px;
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .edit-btn {
        height: 20px;
        font-size: 10px;
        color: #666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .not-login {
    height: 180px;
    background: url("~@/assets/img/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .mobile {
      width: 66px;
      height: 66px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #fc6d5f;
      }
      .toutiao-lishi {
        color: #ffa723;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #e17066;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>