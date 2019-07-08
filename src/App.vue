<script>
// import cookie from '@/utils/cookie'
// import {VERSION} from '@/config'
import {login, getUserInfo} from '@/api/login'
import {getGolbalVar} from '@/api'
import store from '@/store'
import cookie from '@/utils/cookie'
import {json2url} from '@/utils'
import {SIGNATURE_NAME} from '@/config'
const testing = true

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


@import "../static/style/editResume.wxss";
@import "../static/style/weui.wxss";

.ell{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.form-title{
  font-size:26rpx;
  color: #999;
  padding:36rpx 0 24rpx 30rpx;
}
.form-id{
  display: block;
}
.btn-formId{
  border:0;
  padding:0;
  margin:0;
  line-height: 1.5;
  background: transparent;
  font-size:28rpx; 
  text-align: left;
  border-radius:0;
}
.btn-formId::after{
  border:0;
}
.weui-vcode-btn{
  color: #5AA2E7;
  font-size:32rpx;
}
.weui-vcode-btn:active{
  color: #5AA2E7;
}
/* 文字  */
.font-gray-24{
  font-size: 24rpx;
  line-height: 1.5;
  color: #999999;
  word-break: break-all;
}
.font-gray-26{
  font-size: 26rpx;
  line-height: 1.5;
  color: #999999;
  word-break: break-all;
}
.font-34{
  font-size: 34rpx;
  line-height: 48rpx;
  color: #222222;
  word-break: break-all;
}
.font-36{
  font-size: 36rpx;
  line-height: 50rpx;
  color: #000000;
  word-break: break-all;
}
/* 按钮  */
.btn-w690{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:690rpx;
  height: 88rpx;
  line-height: 1; 
  background-color: #5AA2E7!important;
  font-size: 36rpx;
}
/* 右箭头 */
.arrow-right{
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  margin-left:10rpx;
}
/* css 十字形  */
.icon-cross{
  position:relative;
  width:36rpx;
  height: 36rpx;
  overflow: hidden;
}
.icon-cross::before{
  content: ""; 
  position: absolute;
  top:15rpx;
  width:100%;
  height: 6rpx;
  background-color: #5AA2E7;
}
.icon-cross::after{
  content: "";
  position: absolute;
  left:15rpx;
  width:6rpx;
  height: 100%;
  background-color: #5AA2E7;
}
.input-placeholder,.textarea-placeholder,.placeholder{
   color: #999; 
}
/* 扩展可点击区域  */
.extend-clickable-area{
  position: relative;
}
.extend-clickable-area::before{
  content:'';
  position:absolute;
  top:-10rpx;
  bottom:-10rpx;
  left:-10rpx;
  right:-10rpx;
}

</style>
