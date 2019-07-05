import axios from '@/utils/axios'

export const readCompany = (data = {}) => {
  // 单个
  if (data['id']) {
    return axios({
      url: '/company/company/info',
      data
    })
  } else {
    return axios({
      url: '/company/company/info',
      data
    })
  }
}

export const joinApplication = (data = {}) => {
  return axios({
    url: '/company/company/post',
    method: 'POST',
    data
  })
}

export const saveCompanyInfo = (data = {}) => {
  return axios({
    url: '/company/company/edit',
    method: 'POST',
    data
  })
}

export const myCompanyParttime = (data = {}) => {
  return axios({
    url: '/workstu/position/publish_position',
    data
  })
}

// 行业类型
export const companyGetType = () => {
  return axios({
    url: '/company/company/get_type'
  })
}
