import axios from '@/utils/axios'

// 后台须知，对于通知的人，最好采用radius缓存消息，然后定时器批量发送（每天两次左右吧），formid很珍贵，切记 
// update、delete、save都会存一个formid

// 看工作
export const readJob = (data = {}) => {
  // 单个
  if (data['id']) {
    return axios({
      url: '',
      data
    })
  // 多个
  } else {
    return axios({
      url: '',
      data
    })
  }
}

// 获取工作联系电话
export const getJobPhone = (data = {}) => {
  // id
  return axios({
    url: '',
    data
  })
}

// 获取工作相关提示
export const getJobTip = (data = {}) => {
  // 这个后台自己判断公司还是求职者，然后输出申请的提示信息数字
  return axios({
    url: '',
    data
  })
}

/**
 * 
 * 公司权限可以做
 * 
 */

// 公司权限才能做的事情： 更新工作
export const updateJob = (data = {}) => {
  // id | data
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

// 公司权限才能做的事情： 删除工作
export const deleteJob = (data = {}) => {
  // id | data
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

// 公司权限才能做的事情: 新建工作
export const saveJob = (data = {}) => {
  // data
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

// 公司权限才能做的事情： 邀请面试
export const inviteInterview = (data = {}) => {
  // id | application_id
  return axios({
    url: '',
    data
  })
}

// 公司权限才能做的事情： 工作选人
export const resolveJob = (data = {}) => {
  // id | application_id
  return axios({
    url: '',
    data
  })
}

// 公司权限才能做的事情： 工作申请的人 
export const applyJobPerson = (data = {}) => {
  // 
  return axios({
    url: '',
    data
  }) 
}

// 公司权限才能做的事情： 工作拒绝人
export const rejectJob = (data = {}) => {
  // id | application_id
  return axios({
    url: '',
    data
  })
}

/**
 * 
 * 求职者权限可以做
 * 
 */

 // 求职者权限才能做的事情： 岗位申请进度
export const stepParttime = (data = {}) => {
  // id
  if (data['id']) {
    return axios({
      url: '',
      data
    })
  }
}

// 求职者权限才能做的事情： 求职者申请职位
export const applyJob = (data = {}) => {
  // id
  if (data['id']) {
    return axios({
      url: '',
      data
    })
  }
}

// 求职者权限才能做的事情： 求职者点击完成工作,此时应该通知一下公司
export const completeJob = (data = {}) => {
  // id
  if (data['id']) {
    return axios({
      url: '',
      data
    })
  }
}

// 求职者权限才能做的事情： 求职者在做的工作
export const myDoingJob = (data = {}) => {
  return axios({
    url: '',
    data
  })
}

// 求职者权限才能做的事情： 求职者在申请的工作
export const myApplyingJob = (data = {}) => {
  return axios({
    url: '',
    data
  })
}

// 求职者权限才能做的事情： 求职者所有申请的工作
export const myApplyJob = () => {
  return axios({
    url: '',
    data
  })
}

// 求职者权限才能做的事情： 求职者面试完后可评分企业
export const scoreJobCompany = () => {
  // id
  return axios({
    url: '',
    method: 'POST',
    data
  })
}
