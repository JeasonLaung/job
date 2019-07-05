import {fuckPage as fp} from './extra.js'
import store from '@/store'
export const fuckPage = fp
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 微信时间
export const wxtime = (timestamps) => {
  timestamps = timestamps * 1000
  let daySec, dayMin, dayHour, dayS
  let timeNow = new Date().getTime()
  let ts = (timeNow - timestamps) / 1000
  dayS = Math.round(ts / (24 * 60 * 60))
  dayHour = Math.round(ts / (60 * 60))
  dayMin = Math.round(ts / 60)
  daySec = Math.round(ts)
  if (dayS > 0 && dayS < 2) {
    return `${dayS}天前`
  } else if (dayS <= 0 && dayHour > 0) {
    return `${dayHour}小时前`
  } else if (dayHour <= 0 && dayMin > 0) {
    return `${dayMin}分钟前`
  } else if (dayMin <= 0 && daySec >= 0) {
    return '现在'
  } else {
    let timestamp = new Date()
    timestamp.setTime(timestamps)
    return [timestamp.getFullYear(), timestamp.getMonth() + 1, timestamp.getDate()].join('/')
  }
}

// 时间格式化
export const date = (str, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!(str instanceof Date)) {
    str = new Date(str)
  }
  var o = {
    'M+': str.getMonth() + 1, // 月份
    'd+': str.getDate(), // 日
    'h+': str.getHours(), // 小时
    'm+': str.getMinutes(), // 分
    's+': str.getSeconds(), // 秒
    'q+': Math.floor((str.getMonth() + 3) / 3), // 季度
    'S': str.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// promise工厂
export const promisify = original => {
  return function (opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}

// 权限
export const auth = (list, role) => {
  let tmp = []
  for (let i in list) {
    if (!list[i].role === true || list[i].role.includes(role)) {
      tmp.push(list[i])
    }
  }
  return tmp
}
export const xauth = (list, role) => {
  let tmp = []
  for (let i in list) {
    if (list[i].xvalue) {
      let str = list[i].xvalue
      try {
        let res = str.match(/\{\{([^}]+)\}\}/)[1]
        res = res.split('.')
        console.log(res)
        let queue = store.state
        for (let i in res) {
          queue = queue[res[i]]
          console.log(queue)
        }
        list[i].xvalue = str.replace(/\{\{([^}]+)\}\}/, queue)
      } catch (e) {
        continue
      }
    }
    if (!list[i].role === true || list[i].role.includes(role)) {
      tmp.push(list[i])
    }
  }
  return tmp
}

// json转url参数
export const json2url = (json) => {
  return Object.keys(json).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  }).join('&')
}

// json转url参数
export const url2Json = (url) => {
  let temp = {}
  url.replace(/([^?&]+)=([^?&]+)/g, (s, v, k) => {
    temp[v] = decodeURIComponent(k)
    return s
  })
  return temp
}

export function isDate (obj) {
  return (typeof obj === 'object') && obj.constructor === Date
}
export function isString (obj) {
  return (typeof obj === 'string') && obj.constructor === String
}
export function isArray (obj) {
  return (typeof obj === 'array') && obj.constructor === Array
}
export function isNumber (obj) {
  return (typeof obj === 'number') && obj.constructor === Number
}
export function isObject (obj) {
  return (typeof obj === 'object') && obj.constructor === Object
}
export function isFunction (obj) {
  return (typeof obj === 'function') && obj.constructor === Function
}

// 实体转html
export const str2html = (str) => {
  return str.replace(/&lt;/g, '<').replace(/&quot;/g, '"').replace(/&gt;/g, '>')
}
// 操作页面
// export const fuckPage = (delta = 1) => {
//   let pages = getCurrentPages()
//   return new Promise((resolve, reject) => {
//     if (pages.length > delta) {
//       resolve(pages[pages.length - delta - 1])
//     } else {
//       reject(pages[0])
//     }
//   })
// }
// 验证器
// export const validate = (data, type) => {
// }

export default {
  formatNumber,
  formatTime
}
