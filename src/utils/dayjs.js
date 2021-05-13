// 初始化dayjs相关配置
// 加载使用中文语言包
import Vue from 'vue'
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 添加全局过滤器 可以在任何组件中使用
// 所谓的过滤器其实就是一个可以在模板中调用的函数而已
// 在组件模板中使用 {{xxx | relativeTime}}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用的过滤器模板中
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('daytime', (value, format = 'YYYY-MM-DD HH:MM:ss') => {
  return dayjs(value).format(format)
})
// 日期格式化
// console.log(dayjs().format('YYYY^MM-DD HH:mm:ss'));