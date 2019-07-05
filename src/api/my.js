import axios from '@/utils/axios'
import store from '@/store'
// 手机号修改
export const resetPhone = (data = {}) => {
  return axios({
    url: '',
    data,
    method: 'POST'
  })
}

// 手机号保护：学生
export const protectPhone = (data = {}) => {
  return axios({
    url: '',
    data
  })
}

// // 公司实名认证
// export const companyCertification = (data = {}) =>{
//   // 营业执照
//   return axios({
//     url: '',
//     data,
//     isUpload: true,
//     filePath: data['filePath'],
//     method: 'POST'
//   })
// }

// 社会人员实名认证
// export const figureCertification = (data = {}) =>{
//   return axios({
//     url: '',
//     data,
//     isUpload: true,
//     filePath: data['filePath'],
//     method: 'POST'
//   })
// }

// // 学生实名认证
// export const studentCertification = (data = {}) =>{
//   // 学生卡
//   return axios({
//     url: '',
//     data,
//     isUpload: true,
//     filePath: data['filePath'],
//     method: 'POST'
//   })
// }

// 编辑兼职简历
export const updateParttimeResume = (data = {}) => {
  return axios({
    url: '',
    data,
    method: 'POST'
  })
}

// 编辑工作简历
export const updateJobResume = (data = {}) => {
  return axios({
    url: '',
    data,
    method: 'POST'
  })
}

// 编辑公司
export const updateCompany = (data = {}) => {
  return axios({
    url: '',
    data,
    method: 'POST'
  })
}

// 编辑个人基础信息: 跟登录那个有所不同
export const updateUserInfo = (data = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/user/index/edit_info',
      method: 'POST',
      data
    }).then(res => {
      store.commit('setUserInfo', data)
      resolve(res)
    }).catch(res => {
      reject(res)
    })
  })
}
// 获取账户详情
export const getAccount = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/user/index/get_account_info'
    }).then((data) => {
      store.commit('setAccount', data.info)
      resolve(data)
    }).catch(data => {
      reject(data)
    })
  })
}

export const verifyStep = () => {
  return axios({
    url: '/user/check/checking_info'
  })
}

// 实名认证
export const studentVerify = (data = {}) => {
  return axios({
    method: 'POST',
    url: '/user/check/student_post',
    data
  })
}

export const companyVerify = (data = {}) => {
  return axios({
    method: 'POST',
    url: '/user/check/company_post',
    data
  })
}

export const figureVerify = (data = {}) => {
  return axios({
    method: 'POST',
    url: '/user/check/society_post',
    data
  })
}
// 签到
export const daySign = (data = {}) => {
  return axios({
    method: 'POST',
    url: '/user/index/day_sign',
    data
  })
}

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: '/user/index/get_user_info'
    }).then((data) => {
      store.commit('setUserInfo', data)
      resolve(data)
    }).catch(data => {
      reject(data)
    })
  })
}

// 积分
export const readScore = (data = {}) => {
  return axios({
    url: '/user/score/log',
    data
  })
}
// 成长指数
export const readGrowUp = (data = {}) => {
  return axios({
    url: '/user/group_score/log',
    data
  })
}
