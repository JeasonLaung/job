import axios from '@/utils/axios'
import store from '@/store'
import cookie from '@/utils/cookie'
import {ACTION_RESPONSE} from '@/config'
// import {promisify} from '@/utils'
// 获取位置
// export const getLocation = () => {
//   // let url = '/api/location'
//   // return new Promise((resolve, reject) => {
//   //   mpvue.getLocation({
//   //     success (data) {
//   //       axios({
//   //         url,
//   //         data
//   //       }).then((res) => {
//   //         resolve(res)
//   //       }).catch((res) => {
//   //         reject(res)
//   //       })
//   //     },
//   //     fail (res) {
//   //       reject(res)
//   //     }
//   //   })
//   // })
// }

// 用户操作
export const action = (formId) => {
  if (formId === 'the formId is a mock one') {
    return false
  }
  axios({
    method: 'POST',
    url: ACTION_RESPONSE,
    data: {
      formId
    }
  })
}

// 上传文件
export const upload = (options) => {
  return axios({
    url: '/index/asset/uploader',
    // filePath: '',
    name: 'file',
    // data: {},
    upload: true,
    ...options
  })
}

// 轮播图
export const banner = (data) => {
  return axios({
    url: '/index/slide/slide_item',
    data
  })
}

export const allNews = (data) => {
  // post_keywords
  return axios({
    url: '/article/index/article_list',
    data
  })
}

// 新闻动态
export const readNews = (data) => {
  // code
  return axios({
    url: '/article/index/article_page',
    data
  })
}

// 滚动条通知信息
export const notice = (data) => {
  return axios({
    url: '',
    data
  })
}

// 进驻申请写在公司api
// export const enterApplication = (data) => {
//   return axios({
//     url: '',
//     data
//   })
// }

// 智能识别api,上传文件的
// 银行卡 | 营业执照 | 身份证
export const ocr = (data) => {
  return axios({
    url: '',
    data
  })
}

// 举报
export const report = (data = {}) => {
  // to_user_id,id,type
  // _type为前端自己判断种类的变量
  switch (data['_type']) {
    case 'post':
      return axios({
        url: '/sharebbs/index/report',
        data,
        method: 'POST'
      })
    case 'comment':
      return axios({
        url: '/sharebbs/comment/report',
        data,
        method: 'POST'
      })
    default:
      console.warn('举报api没有传入_type一判断类型的变量')
      return false
  }
}
// 举报类型
export const getReportTag = () => {
  // to_user_id,id,type
  return axios({
    url: '/sharebbs/index/report_option'
  })
}

export const getOtherInfo = (data = {}) => {
  return axios({
    url: '/user/index/get_user',
    data
  })
}
export const getGolbalVar = () => {
  return axios({
    url: '/index/index/site_var'
  }).then(data => {
    store.commit('setGlobalVar', data)
  })
}

export const getCities = () => {
  let c = cookie.get('city')
  if (c) {
    return new Promise((resolve, reject) => {
      resolve(c)
    })
  } else {
    return new Promise((resolve, reject) => {
      axios({
        url: '/index/index/area_list'
      }).then(data => {
        cookie.set('city', data.list)
        resolve(data)
      }).catch(data => {
        reject(data)
      })
    })
  }
}

export const getTypes = () => {
  let c = cookie.get('job_type')
  if (c) {
    return new Promise((resolve, reject) => {
      resolve(c)
    })
  } else {
    return new Promise((resolve, reject) => {
      axios({
        url: '/job/position/type_list'
      }).then(data => {
        cookie.set('job_type', data.list)
        resolve(data.list)
      }).catch(data => {
        reject(data)
      })
    })
  }
}
