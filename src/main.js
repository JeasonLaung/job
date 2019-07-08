import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$getUserInfo = () => {
}
Vue.prototype.$getPhoneNumber = () => {
}

let $tell = (e) => {
  console.log(e)
}
let $go = (url, type = 'navigateTo') => {
  mpvue[type]({
    url
  })
}
let $collect = (e) => {
  let url = e.mp.target.dataset.url
  if (e.mp.target.dataset.url) {
    $go(url)
  }
  console.log('我获取了你的formid' + e.target.formId)
}

Vue.prototype.$tell = $tell
Vue.prototype.$go = $go
Vue.prototype.$collect = $collect

const app = new Vue(App)
app.$mount()
