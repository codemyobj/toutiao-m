<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 
      这里设置的是一级路由出口 keepalive 仅对该路由组件有效
    -->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["cachePages"]),
  },
};
</script>

<style lang="less">
</style>
