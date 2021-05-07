import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './assets/css/index.less'

Vue.config.productionTip = false

//创建vue根实例
//把app根组件渲染到#app节点 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
