import axios from '@/utils/axios'
import cookie from '@/utils/cookie'
import {SIGNATURE_NAME, SESSION_NAME} from '@/config'

// 登陆，顺便获取用户信息 // 获取了用户信息的话通常直接拉取到store
// userInfo = {role,id,name,shotcut,[company/school]}
export const login = () => {
  return new Promise((resolve, reject) => {
    mpvue.login({
      success ({code}) {
        axios({
          url: '/index/login/login',
          data: {
            code
          },
          all: true
        }).then(({header, data}) => {
          cookie.set(SIGNATURE_NAME, header[SIGNATURE_NAME])
          cookie.set(SESSION_NAME, header[SESSION_NAME])
          resolve(data)
        }).catch((res) => reject(res))
      }
    })
  })
}

// 用手机验证码登陆
export const userPhone = (data = {}) => {
  // phone
  return axios({
    url: '/user/index/save_mobile',
    data,
    method: 'POST'
  })
}

// 发送验证码
export const sendCode = (data = {}) => {
  // phone | code
  return axios({
    url: '/index/index/get_sms_code',
    data,
    method: 'POST'
  })
}

// 用微信手机登录
export const wxPhone = (data = {}) => {
  // iv | encryptedData
  return axios({
    url: '/user/index/wx_mobile',
    data,
    method: 'POST',
    // 头部要给一个session给服务器解密
    header: {
      [SESSION_NAME]: cookie.get(SESSION_NAME)
    }
  })
}

export const saveUserInfo = (data = {}) => {
  // iv | encryptedData
  return axios({
    url: '/user/index/save_info',
    data,
    method: 'POST',
    // 头部要给一个session给服务器解密
    header: {
      [SESSION_NAME]: cookie.get(SESSION_NAME)
    }
  })
}

export const getUserInfo = () => {
  return axios({
    url: '/user/index/get_user_info'
  })
}
