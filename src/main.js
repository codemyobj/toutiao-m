import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';


// 加载全局样式
import './assets/css/index.less'
// 加载vant组件库样式
import 'vant/lib/index.css';

// 自动设置REM基准值(html标签字体大小)
import 'amfe-flexible'

import './utils/dayjs'

//全局注册vant组件
Vue.use(Vant);

Vue.config.productionTip = false

//创建vue根实例
//把app根组件渲染到#app节点 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
