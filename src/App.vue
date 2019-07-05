<script>
// import cookie from '@/utils/cookie'
// import {VERSION} from '@/config'
import {login, getUserInfo} from '@/api/login'
import {getGolbalVar} from '@/api'
import store from '@/store'
import cookie from '@/utils/cookie'
import {json2url} from '@/utils'
import {SIGNATURE_NAME} from '@/config'
const testing = false

export default {

  onLaunch (options) {
    // options = {path, query, scene, shareTicket, referrerInfo}
    // 如果第一次打开直接跳到login
    let path = options['path']
    // 只有登陆账号后才存放这个东西，所以在login页存放
    // let version = cookie.get(VERSION)
    // 登陆页
    let loginUrl = '/pages/login/main?redirect=/' + path + '&query=' + JSON.stringify(options['query'])

    getGolbalVar()

    if (!testing) {
      login().then((data) => {
        // 已绑定手机
        if (data.phone) {
          getUserInfo().then((data) => {
            store.commit('setUserInfo', data)
            let logs = cookie.get('logs')
            if (Date.now() - logs[1] < 24 * 3600 || cookie.get(SIGNATURE_NAME)) {
            } else {
              mpvue.reLaunch({
                url: '/' + path + '?' + json2url(options['query'])
              })
            }
          })
        } else {
          // 没绑定手机
          mpvue.reLaunch({
            url: loginUrl
          })
        }
      })
    }
    // if (!version) {
    //   // 版本更新自动清空所有缓存
    //   cookie.clear()
    //   login()
    //   mpvue.reLaunch({
    //     url: loginUrl
    //   })
    // } else {
    //   login().then(() => {
    //     getUserInfo().then((data) => {
    //       store.commit('setUserInfo', data)
    //     })
    //   })
    // }
  },

  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
@import '../static/style/icon.wxss';
@import './app.css';

page{
  font-size: 30rpx;
  /* background-image: url('https://jeason.xyz/static/3.gif'); */
  /* background-repeat: no-repeat; */
  /* background-position: center; */
  /* background-size: 350rpx 350rpx; */
}
.page{
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}


</style>
