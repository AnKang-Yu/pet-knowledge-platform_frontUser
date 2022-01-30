import App from './App'
import './utils/permission'
// 导入自己的api
import { myRequest } from './utils/api.js'
// 挂载到全局
Vue.prototype.$myRequest = myRequest

// 全局过滤器过滤时间格式
Vue.filter("formatDate" , (inputDate)=>{
	if (inputDate == null) {
	    return ` `
	}
	const date = new Date(inputDate)
	return `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()} ${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}:${date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()}`
})
Vue.filter("formatDay" , (inputDate)=>{
	if (inputDate == null) {
	    return ` `
	}
	const date = new Date(inputDate)
	return `${date.getFullYear()}-${date.getMonth() + 1 >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()}`
})
Vue.filter("friendlyDate" , (inputDate)=>{
	const currentDate = new Date()
    const date = new Date(inputDate)
    return ((currentDate.getFullYear() - date.getFullYear()) ) +'岁' + (currentDate.getMonth() - date.getMonth()) + '个月'
})



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif