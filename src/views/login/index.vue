<template>
  <div class="login-container">
    <nav-bar>
      <div slot="center">注册/登录</div>
      <div slot="left" class="left-arrow">
        <i class="toutiao toutiao-youjiantou" @click="$router.back()"></i>
      </div>
    </nav-bar>

    <!-- 登录表单 -->
    <!-- 
      1基于vant表单验证
      使用van-form组件包裹所有的表单相 van-field
      2 给van-form绑定submit事件
      当表单提交的时候回触发submit事件
      只有表单验证通过 才会调用submit
      3 通过 rules 定义表单校验规则
    -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="onLogin"
      @failed="onFailed"
      ref="loginRef"
    >
      <van-field
        name="mobile"
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        center
        class="icon"
        :rules="formRules.mobile"
      />
      <van-field
        name="code"
        v-model="user.code"
        clearable
        left-icon="yanzhengma"
        icon-prefix="toutiao"
        placeholder="请输入验证码"
        center
        class="icon"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />

          <van-button
            class="send-btn"
            size="small"
            round
            v-else
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>

    <!-- /登录表单 -->
  </div>
</template>

<script>
import NavBar from "@/components/navbar/index";

import { login, sendSms } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {
    NavBar,
  },
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111111", //手机号
        code: "246810", //验证码
      },
      // 验证规则
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false, //控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false, //发送验证码按钮的loading状态
    };
  },
  methods: {
    // 网络请求
    async onLogin() {
      this.$toast.loading({
        message: "登陆中...", //提示文本
        forbidClick: true, //禁止背景点击
        duration: 0, //展示时长(ms)，值为 0 时，toast 不会消失
      });
      try {
        const { data } = await login(this.user);
        this.$toast.success("登录成功");

        //将后端返回的用户登录状态 token等数据 放在vuex容器中
        this.$store.commit("setUser", data.data);

        // 把tabbar的缓存清除 让它重新渲染
        this.$store.commit("removeCachePage", "TabBar");

        // 登录成功 跳转到原来页面
        // this.$router.back();
        this.$router.push(this.$route.query.redirect || "/");
      } catch (err) {
        this.$toast.fail("登录失败,手机号或验证码错误");
      }
      //promise 用法
      // Login(this.user)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    // 方法
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },

    async onSendSms() {
      try {
        // 校验手机号码
        await this.$refs.loginRef.validate("mobile");
        // 验证通过 请求发送验证码
        this.isSendSmsLoading = true; //展示按钮的loading状态 防止用户多次点击发出多次网络请求
        await sendSms(this.user.mobile);
        // 隐藏发送按钮 显示倒计时
        // 监视倒计时的finish事件让倒计时隐藏
        this.isCountDownShow = true;
      } catch (err) {
        // try里面任何代码的错误都会进入catch
        // 不同的错误需要不同的提示 需要判断
        let message = "";
        if (err && err.response && err.response.status === 429) {
          // 发送太频繁的提示
          message = "发送太频繁了,请稍后重试";
        } else if (err.name === "mobile") {
          // 表单验证失败的错误提示
          message = err.message;
        } else {
          //位置错误
          message = "发送失败,请稍后重试";
        }
        this.$toast({
          message,
          position: "top",
        });
      }

      // 无论发送验证码成功或是失败 都要关闭发送按钮的loading
      this.isSendSmsLoading = false;
    },
  },
};
</script>
<style scoped lang='less'>
.left-arrow {
  margin-right: 10px;
}
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      border: none;
      font-size: 15px;
    }
  }
  .icon {
    line-height: 45px;
  }
  .send-btn {
    width: 80px;
    height: 30px;
    vertical-align: middle;
    background-color: #eeeeee;
    font-size: 11px;
    color: #666;
  }
}
</style>