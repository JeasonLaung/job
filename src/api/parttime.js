import axios from '@/utils/axios'

// 后台须知，对于通知的人，最好采用radius缓存消息，然后定时器批量发送（每天两次左右吧），formid很珍贵，切记
// update、delete、save都会存一个formid

// 筛选的字段
export const getFilter = () => {
  return axios({
    url: '/workstu/position/search_type'
  })
}

// 看兼职
export const readParttime = (data = {}, edit = false) => {
  // 修改获取数据
  if (edit === true && data['id']) {
    return axios({
      url: '/workstu/position/edit',
      data
    })
  }
  // 单个
  if (data['id']) {
    return axios({
      url: '/workstu/position/position_info',
      data
    })
  } else if (data['company_id']) {
    return axios({
      url: '/workstu/position/company_position',
      data
    })
  } else {
    return axios({
      url: '/workstu/position/position_list',
      data
    })
  }
}

// 获取兼职联系电话
export const getParttimePhone = (data = {}) => {
  // id
  return axios({
    url: '',
    data
  })
}

// 获取兼职相关提示
export const getParttimeTip = (data = {}) => {
  // 这个后台自己判断公司还是学生，然后输出申请的提示信息数字
  return axios({
    url: '',
    data
  })
}

/**
 * 公司权限可以做
 */

export const hasReadApplication = (data = {}) => {
  return axios({
    url: '/workstu/order/order_check',
    data
  })
}

export const getParttimeType = () => {
  return axios({
    url: '/workstu/position/get_type'
  })
}

// 公司权限才能做的事情: 更新兼职
export const updateParttime = (data = {}) => {
  // id | data
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

// 公司权限才能做的事情: 删除兼职
export const deleteParttime = (data = {}) => {
  // id | data
  return axios({
    url: '/workstu/position/delete',
    method: 'POST',
    data
  })
}

// 公司权限才能做的事情: 新建兼职
export const saveParttime = (data = {}) => {
  // data
  if (data['id']) {
    return axios({
      url: '/workstu/position/edit_post',
      method: 'POST',
      data
    })
  } else {
    return axios({
      url: '/workstu/position/add_post',
      method: 'POST',
      data
    })
  }
}

// 公司权限才能做的事情: 兼职申请的人
export const applyParttimePerson = (data = {}) => {
  // status 0： 未处理，1:已处理，“”：全部
  return axios({
    url: '/workstu/order/company_order',
    data
  })
}

// 公司权限才能做的事情： 兼职选人
export const resolveParttime = (data = {}) => {
  // id | application_id
  return axios({
    url: '/workstu/order/order_agree',
    data
  })
}

// 公司权限才能做的事情： 兼职拒绝人
export const rejectParttime = (data = {}) => {
  // id | application_id
  return axios({
    url: '/workstu/order/order_refuse',
    data
  })
}

// 公司权限才能做的事情： 先由学生发起，公司确认兼职已做完
export const completeParttimeSure = (data = {}) => {
  // id
  return axios({
    url: '/workstu/order/order_complete_sure',
    data,
    method: 'POST'
  })
}

// 公司权限才能做的事情： 公司的兼职正在进行的人
export const companyParttimePerson = (data = {}) => {
  return axios({
    url: '/workstu/order/position_working',
    data
  })
}

// 学生权限才能做的事情： 公司向兼职学生打分
export const scoreParttimeStudent = (data = {}) => {
  // id
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

/**
 * 学生权限可以做
 */

// 学生权限才能做的事情： 兼职进度
export const stepParttime = (data = {}) => {
  // id
  if (data['id']) {
    return axios({
      url: '/workstu/order/order_info',
      data
    })
  }
}

// 学生权限才能做的事情： 学生撤回申请职位
export const unapplyParttime = (data = {}) => {
  return axios({
    url: '/workstu/order/delete',
    data,
    method: 'POST'
  })
}

// 学生权限才能做的事情： 学生申请职位
export const applyParttime = (data = {}) => {
  // id
  return axios({
    url: '/workstu/order/position_post',
    data,
    method: 'POST'
  })
}

// 学生权限才能做的事情： 学生点击完成工作,此时应该通知一下公司
export const completeParttime = (data = {}) => {
  // id
  if (data['id']) {
    return axios({
      url: '/workstu/order/order_complete',
      data
    })
  }
}

// 学生权限才能做的事情： 学生在做的兼职
export const myDoingParttime = (data = {}) => {
  return axios({
    url: '/workstu/order/working_order',
    data
  })
}

// 学生权限才能做的事情： 学生在申请的兼职
export const myApplyingParttime = (data = {}) => {
  return axios({
    url: '/workstu/order/checking_order',
    data
  })
}

// 学生权限才能做的事情： 学生已完成的兼职，此处应该有获取的金额
export const myDoneParttime = (data = {}) => {
  return axios({
    url: '/workstu/order/ending_order',
    data
  })
}

// 学生权限才能做的事情： 学生所有申请的兼职
export const myApplyParttime = (data = {}) => {
  return axios({
    url: '',
    data
  })
}

// 学生权限才能做的事情： 学生向兼职公司打分
export const scoreParttimeCompany = (data = {}) => {
  // id
  return axios({
    url: '',
    method: 'POST',
    data
  })
}

// 企业待确认名单
export const unsureParttimeList = (data = {}) => {
  // id
  return axios({
    url: '/workstu/order/company_order',
    method: 'POST',
    data: {
      ...data,
      status: 2
    }
  })
}
// 企业已确认名单
export const sureParttimeList = (data = {}) => {
  // id
  return axios({
    url: '/workstu/order/company_order',
    method: 'POST',
    data: {
      ...data,
      status: 2
    }
  })
}
